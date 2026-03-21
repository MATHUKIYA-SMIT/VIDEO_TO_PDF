const fs = require("fs");
const pdfRepository = require("../../models/user/pdf.model");
const AppError = require("../../utils/AppError");

exports.download = async (pdfId, userId) => {

    const pdf = await pdfRepository.findById(pdfId);

    if (!pdf) {
        throw new AppError("PDF not found", 404);
    }

    // 🔐 Ownership check
    if (pdf.user_id !== userId) {
        throw new AppError("Access denied", 403);
    }

    // 📁 Check file exists
    if (!fs.existsSync(pdf.pdf_path)) {
        throw new AppError("PDF file missing on server", 404);
    }

    return {
        path: pdf.pdf_path,
        name: pdf.pdf_name
    };
};


exports.removeFile = (filePath) => {
    try {
        fs.unlinkSync(filePath);
    } catch (err) {
        console.error("Failed to delete PDF:", err);
    }
};

//used by video.service.js
exports.createFromVideo = async (
    videoId,
    pdfName,
    pdfPath,
    connection = null
) => {
    return await pdfRepository.create(
        { videoId, pdfName, pdfPath },
        connection
    );
};