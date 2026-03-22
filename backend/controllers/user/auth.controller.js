const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authService = require("../../services/user/auth.service");

exports.signup = async (req, res, next) => {
    try {
        const result = await authService.signup(req.body);

        res.status(201).json({
            success: true,
            message:  "OTP sent to email",
        });
    } catch (err) {
        next(err);
    }
};

exports.verifyEmailOTP = async (req, res, next) => {
    try {
        const result = await authService.verifyEmailOTP(req.body);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",                    // true in production (HTTPS)
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" in production.
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: result.user,
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const result = await authService.forgotPassword(req.body);

        res.status(200).json({
            success: true,
            message: "Reset OTP sent to email",
        });
    } catch (err) {
        next(err);
    }
};

exports.verifyResetOTP = async (req, res, next) => {
    try {
        const result = await authService.verifyResetOTP(req.body);

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (err) {
        next(err);
    }
};

exports.resendOTP = async (req, res, next) => {
    try {
        const result = await authService.resendOTP(req.body);

        res.status(200).json({
            success: true,
            message:  "OTP resent successfully",
        });

    } catch (err) {
        next(err);
    }
};

exports.cancelSignup = async (req, res, next) => {
    try {
        const result = await authService.cancelSignup(req.body);

        res.status(200).json({
            success: true,
            message:  "Signup cancelled successfully",
        });
    } catch (err) {
        next(err);
    }
};

exports.googleLogin = async (req, res, next) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const result = await authService.googleLogin(payload);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",                    // true in production (HTTPS)
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" in production.
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Google login successful",
            user: result.user,
        });

    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",                    // true in production (HTTPS)
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" in production.
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",                    // true in production (HTTPS)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" in production.
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};



