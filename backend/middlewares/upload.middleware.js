const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // temp folder
    },
    filename: (req, file, cb) => {
        const userId = req.user?.id || "unknown";
        const ext = path.extname(file.originalname);
        cb(null, `${userId}_${Date.now()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;