const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require("../../utils/sendEmail");
const authRepository = require("../../models/user/auth.model");
const { OTP_TYPES } = require("../../constants/otp.constant");
const { validatePassword } = require("../../utils/validators/password.validator");
const AppError = require("../../utils/AppError");

// 🔹 SIGNUP
exports.signup = async ({ username, email, password, confirmPassword }) => {

    if (!email || !password || !confirmPassword) {
        throw new AppError("Email, password and confirm password are required !!",400);
    }

    if (password !== confirmPassword) {
        throw new AppError("Password and Confirm Password do not match !!",400);
    }

    validatePassword(password);

    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {

        // If already verified → block
        if (existingUser.is_verified) {
            throw new AppError("User with this email already exists !!",409);
        }

        // If unverified → delete old record
        await authRepository.deleteUserByEmail(email);
    }

    const saltRounds = 10; // industry standard
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    await authRepository.insertUser({
        email,
        username: username?.trim() || null,
        passwordHash,
        emailOtp: hashedOtp,
        otpExpiry: expiry,
    });

    await sendEmail(
        email,
        "Verify Your Email",
        `Your OTP is ${otp}. Valid for 2 minutes.`
    );

};

// 🔹 VERIFY OTP
exports.verifyEmailOTP = async ({ email, otp }) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.is_verified) {
        throw new AppError("Already verified", 400);
    }

    const isMatch = await bcrypt.compare(otp, user.email_otp);
    if (!isMatch) {
        throw new AppError("Invalid OTP", 400);
    }

    if (new Date(user.otp_expiry) < new Date()) {
        throw new AppError("OTP expired", 400);
    }

    await authRepository.markUserVerified(email);

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        user
    };
};

// 🔹 FORGOT PASSWORD
exports.forgotPassword = async ({ email, password, confirmPassword }) => {

    if (!email || !password || !confirmPassword) {
        throw new AppError("All fields are required", 400);
    }

    if (password !== confirmPassword) {
        throw new AppError("Passwords do not match", 400);
    }

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.is_verified) {
        throw new AppError("Email not verified", 400);
    }

    const saltRounds = 10; // industry standard
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    await authRepository.updateUserOTP(email, hashedOtp, expiry);

    await sendEmail(
        email,
        "Password Reset OTP",
        `Your password reset OTP is ${otp}. Valid for 2 minutes.`
    );
};

// 🔹 VERIFY RESET OTP
exports.verifyResetOTP = async ({ email, otp, password }) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new AppError("User not found", 404);

    const isMatch = await bcrypt.compare(otp, user.email_otp);
    if (!isMatch) {
        throw new AppError("Invalid OTP", 400);
    }

    if (new Date(user.otp_expiry) < new Date())
        throw new AppError("OTP expired", 400);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await authRepository.updatePassword(email, passwordHash);

};

exports.resendOTP = async ({ email, type }) => {

    if (!email) {
        throw new AppError("Email is required", 400);
    }

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // 🔹 SIGNUP FLOW
    if (type ===  OTP_TYPES.SIGNUP) {

        if (user.is_verified) {
            throw new AppError("Email already verified", 400);
        }

    }

    // 🔹 RESET PASSWORD FLOW
    else if (type === OTP_TYPES.RESET) {

        if (!user.is_verified) {
            throw new AppError("Email not verified", 400);
        }

    }

    else {
        throw new AppError("Invalid OTP type", 400);
    }

    const saltRounds = 10; // industry standard
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    await authRepository.updateUserOTP(email, hashedOtp, expiry);

    const subject =
        type === "signup"
            ? "Resend Email Verification OTP"
            : "Resend Password Reset OTP";

    await sendEmail(
        email,
        subject,
        `Your new OTP is ${otp}. Valid for 2 minutes.`
    );

};

exports.cancelSignup = async ({ email }) => {
    if (!email) {
        throw new AppError("Email is required", 400);
    }

    const existingUser = await authRepository.findUserByEmail(email);

    if (!existingUser) {
        throw new AppError("No signup record found", 404);
    }

    if (existingUser.is_verified) {
        throw new AppError("User already verified", 400);
    }

    await authRepository.deleteUserByEmail(email);

};

exports.googleLogin = async (payload) => {

    const { email, name, picture, email_verified } = payload;

    if (!email_verified) {
        throw new AppError("Google email not verified", 400);
    }

    let user = await authRepository.findUserByEmail(email);

    if (!user) {
        // create new google user
        await authRepository.insertGoogleUser({
            email,
            username: name,
            profileImage: picture
        });

        user = await authRepository.findUserByEmail(email);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        user
    };
};

// 🔹 LOGIN
exports.login = async ({ email, password }) => {

    if (!email || !password) {
        throw new AppError("Email and password are required !!", 400);
    }

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email !!", 401);
    }

    if (user.status === "SUSPENDED") {
        throw new AppError("Your account has been suspended. Please contact support.", 403);
    }

    if (user.status === "DELETED") {
        throw new AppError("This account has been deleted.", 403);
    }

    if (user.auth_provider === "google") {
        throw new AppError("This account was created using Google. Please login with Google.", 400);
    }

    if (!user.is_verified) {
        throw new AppError("Please verify email first !!", 403);
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
        throw new AppError("Invalid password !!", 401);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        user
    };
};

