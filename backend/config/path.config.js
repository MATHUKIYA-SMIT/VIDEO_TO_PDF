const path = require("path");

module.exports = {
    STORAGE_DIR: path.join(__dirname, "..", "..", "storage"),
    VIDEO_DIR: path.join(__dirname, "..", "..", "storage", "videos"),
    FRAME_DIR: path.join(__dirname, "..", "..", "storage", "frames"),
    PDF_DIR: path.join(__dirname, "..", "..", "storage", "pdfs"),
};