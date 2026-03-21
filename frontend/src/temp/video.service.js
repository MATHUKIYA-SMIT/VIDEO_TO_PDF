const path = require("path");
const fs = require("fs");

const { getDB } = require("../../config/db.config");
const { VIDEO_DIR } = require("../../config/path.config");

const { downloadYoutubeVideo } = require("../../utils/execUtil");
const { runPythonFrameExtractor } = require("../../utils/pythonRunner");
const { runFramesToPdf } = require("../../utils/pythonPdfRunner");
const { safeDelete } = require("../../utils/fileCleanup");

const { getVideoDuration } = require("../../utils/VideoDuration");

const videoRepository = require("../../models/user/video.model");
const pdfService = require("../../services/user/pdf.service");
const usageService = require("../../services/user/usage.service");

const AppError = require("../../utils/AppError");

exports.downloadVideoFromUrl = async (url, userId) => {

    const db = getDB();
    const connection = await db.getConnection();

    try {

        const durationMinutes = 20; // dummy duration for testing

        if (durationMinutes > 15) {
            throw new AppError("Video duration cannot exceed 15 minutes", 400);
        }

        const durationSeconds = Math.round(durationMinutes * 60);
        const baseName = `test_${Date.now()}_${userId}`;

        await connection.beginTransaction();

        // 🔹 1️⃣ Update Usage
        await usageService.checkAndUpdateUsage(
            userId,
            durationMinutes,
            connection
        );

        // 🔹 2️⃣ Create Video Record
        const videoId = await videoRepository.create(
            {
                userId,
                url,
                durationSeconds ,
                videoName: `${baseName}.mp4`,
                videoPath: `/test/path/${baseName}.mp4`,
                status: "completed",
            },
            connection
        );

        // 🔹 3️⃣ Create Dummy PDF Record
        const pdfName = `${baseName}.pdf`;
        const pdfPath = `/test/path/${baseName}.pdf`;

        const pdfId = await pdfService.createFromVideo(
            videoId,
            pdfName,
            pdfPath,
            connection
        );

        console.log("COMMITTING TRANSACTION...");
        // 🔹 4️⃣ Commit Transaction
        await connection.commit();
        connection.release();

        return {
            videoId,
            pdfId,
            message: "Test transaction successful"
        };

    } catch (err) {

        await connection.rollback();
        connection.release();

        throw err;
    }
};


exports.getUserVideos = async (userId) => {
    return await videoRepository.findByUserId(userId);
};