const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const authController = require("../../controllers/user/auth.controller");

router.post("/signup", authController.signup);
router.delete("/cancel-signup", authController.cancelSignup);
router.post("/verify-otp", authController.verifyEmailOTP);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-reset-otp", authController.verifyResetOTP);
router.post("/resend-otp", authController.resendOTP);
router.post("/login", authController.login);
router.post("/google", authController.googleLogin); 
router.post("/logout", isAuthenticated, authController.logout);

module.exports = router;
