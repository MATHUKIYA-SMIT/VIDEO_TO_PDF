const cloudinary = require("../../config/cloudinary.config");
const fs = require("fs");
const userRepository = require("../../models/user/user.model");
const AppError = require("../../utils/AppError");

exports.getMe = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

exports.updateTheme = async (userId, theme) => {

    if (!theme || !["light", "dark"].includes(theme)) {
        throw new AppError("Invalid theme value", 400);
    }

    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    await userRepository.updateTheme(userId, theme);
};

exports.updateAvatar = async (userId, filePath) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
        folder: `vid_2_pdf_local/user_${userId}`,
        public_id: "avatar",
        overwrite: true,
    });

    // Delete temp file
    fs.unlinkSync(filePath);

    await userRepository.updateProfileImage(userId, result.secure_url, result.public_id);

    return result.secure_url;
};

exports.updateUsername = async (userId, username) => {
    if (!username || username.length < 3) {
        throw new AppError("Username must be at least 3 characters", 400);
    }

    const user = await userRepository.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    await userRepository.updateUsername(userId, username);
    return username;
};

exports.deleteAccount = async (userId) => {

    const user = await userRepository.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.cloudinary_public_id) {
        try{
            // Delete avatar from Cloudinary
            await cloudinary.uploader.destroy(
                `vid_2_pdf_local/user_${userId}/avatar`
            );

            // Delete folder (will succeed if empty)
            await cloudinary.api.delete_folder(
                `vid_2_pdf_local/user_${userId}`
            );
        }catch (err) {
            throw new Error("Cloudinary cleanup failed during account deletion");
        }
    }

    // Soft delete (recommended)
    await userRepository.markAsDeleted(userId);
};