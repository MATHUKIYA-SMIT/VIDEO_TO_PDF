const path = require("path");
const fs = require("fs");

const { getDB } = require("../../config/db.config");
const { VIDEO_DIR } = require("../../config/path.config");

const { downloadYoutubeVideo } = require("../../utils/execUtil");
const { runPythonFrameExtractor } = require("../../utils/pythonRunner");
const { runFramesToPdf } = require("../../utils/pythonPdfRunner");
const { safeDelete } = require("../../utils/fileCleanup");

const { getVideoDuration } = require("../../utils/videoDuration");

const videoRepository = require("../../models/user/video.model");
const pdfService = require("../../services/user/pdf.service");
const usageService = require("../../services/user/usage.service");

const AppError = require("../../utils/AppError");
const { isValidYoutubeUrl } = require("../../utils/validators/youtube.validator");

exports.downloadVideoFromUrl = async (url, userId) => {

    if (!isValidYoutubeUrl(url)) {
        throw new AppError("Invalid YouTube URL", 400);
    }

    const db = getDB();
    const connection = await db.getConnection();

    const startTime = Date.now();

    let videoId;
    let finalPath;
    let framesDir;

    const baseName = `video_${Date.now()}_${userId}`;

    try {

        // 🔹 1️⃣ Get Video Duration FIRST
        const durationMinutes = await getVideoDuration(url);

        console.log("duration in mintes ",durationMinutes);

        if (durationMinutes > 20) {
            throw new AppError("Video duration cannot exceed 15 minutes", 400);
        }

        const durationSeconds = Math.round(durationMinutes * 60);

        // 🔹 2️⃣ Start Transaction
        await connection.beginTransaction();

        // 🔹 3️⃣ Check & Update Usage (inside transaction)
        await usageService.checkAndUpdateUsage(
            userId,
            durationMinutes,
            connection
        );

        if (!fs.existsSync(VIDEO_DIR)) {
            fs.mkdirSync(VIDEO_DIR, { recursive: true });
        }

        const fileTemplate = `${baseName}.%(ext)s`;
        const outputPath = path.join(VIDEO_DIR, fileTemplate);

        // 🔹 4️⃣ Create Video Record
        videoId = await videoRepository.create(
            {
                userId,
                url,
                durationSeconds,
                videoName: fileTemplate,
                videoPath: outputPath,
                status: "processing",
            },
            connection
        );

        // 🔹 5️⃣ Download Video
        await downloadYoutubeVideo(url, outputPath);

        const files = fs.readdirSync(VIDEO_DIR);
        const actualFile = files.find(file =>
            file.startsWith(baseName)
        );

        if (!actualFile) {
            throw new AppError("Downloaded video file not found !!", 500);
        }

        finalPath = path.join(VIDEO_DIR, actualFile);

        // 🔹 6️⃣ Update Status → completed
        await videoRepository.updateStatus(
            videoId,
            "completed",
            actualFile,
            finalPath,
            connection
        );

        // 🔹 7️⃣ Extract Frames
        framesDir = await runPythonFrameExtractor(
            finalPath,
            videoId,
            baseName
        );

        // 🔹 8️⃣ Convert frames to PDF
        const pdfPath = await runFramesToPdf(
            framesDir,
            videoId,
            baseName
        );

        if (!pdfPath) {
            throw new AppError("PDF generation failed !!", 500);
        }

        const pdfName = path.basename(pdfPath);

        // 🔹 9️⃣ Save PDF Record
        const pdfId = await pdfService.createFromVideo(
            videoId,
            pdfName,
            pdfPath,
            connection
        );

        // 🔹 🔟 Commit Transaction
        await connection.commit();
        connection.release();

        // 🔹 Cleanup files (outside DB transaction)
        safeDelete(finalPath);  // delete video
        safeDelete(framesDir);  // delete frames folder

        const endTime = Date.now();
        console.log(`⏱ TOTAL TIME: ${(endTime - startTime) / 1000} seconds`);

        return { videoId, pdfId };

    } catch (err) {

        // 🔹 Rollback DB Changes
        await connection.rollback();
        connection.release();

        // 🔹 Update video status if created
        if (videoId) {
            await videoRepository.updateStatus(videoId, "failed");
        }

        // 🔹 Cleanup Files
        if (finalPath) safeDelete(finalPath);
        if (framesDir) safeDelete(framesDir);

        if (err instanceof AppError) {
            throw err;
        }

        throw new AppError("Video processing failed !!", 500);
    }
};


exports.getUserVideos = async (userId) => {
    return await videoRepository.findByUserId(userId);
};