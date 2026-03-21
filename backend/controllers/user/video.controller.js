const videoService = require("../../services/user/video.service");
const AppError = require("../../utils/AppError");

exports.downloadVideoFromUrl = async (req, res, next) => {
    try {
        const { url } = req.body;
        const userId = req.user.id;

        if (!url) {
            throw new AppError("Video URL is required", 400);
        }

        const result = await videoService.downloadVideoFromUrl(
            url,
            userId
        );

        res.status(200).json({
            success: true,
            message: "PDF created successfully",
            pdfId: result.pdfId,
            downloadUrl: `/api/pdfs/${result.pdfId}/download`,
        });

    } catch (err) {
        next(err);
    }
};


exports.getUserVideos = async (req, res, next) => {
    try {
        const videos = await videoService.getUserVideos(req.user.id);

        res.status(200).json({
            success: true,
            data: videos
        });

    } catch (err) {
        next(err);
    }
};

