const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const userController = require("../../controllers/user/user.controller");
const upload = require("../../middlewares/upload.middleware");

router.put(
    "/profile/avatar",
    isAuthenticated,
    upload.single("avatar"),
    userController.updateAvatar
);
router.put(
    "/profile/username",
    isAuthenticated,
    userController.updateUsername
);
router.delete(
    "/profile",
    isAuthenticated,
    userController.deleteAccount
);
router.get("/me", isAuthenticated, userController.getMe);
router.post("/theme", isAuthenticated, userController.updateTheme);

module.exports = router;
