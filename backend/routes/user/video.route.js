const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const videoController = require("../../controllers/user/video.controller");

router.post("/convert", isAuthenticated, videoController.downloadVideoFromUrl);
router.get("/", isAuthenticated, videoController.getUserVideos);

module.exports = router;
