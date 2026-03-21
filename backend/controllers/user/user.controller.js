const userService = require("../../services/user/user.service");

exports.getMe = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await userService.getMe(userId);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateTheme = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { theme } = req.body;
        await userService.updateTheme(
            userId,
            theme
        );

        res.status(200).json({
            success: true,
            message: "Theme updated successfully",
        });
    } catch (err) {
        next(err);
    }
};

exports.updateAvatar = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: "No file uploaded" });
        }

        const imageUrl = await userService.updateAvatar(
            userId,
            req.file.path
        );

        res.status(200).json({
            success: true,
            message: "Profile photo updated successfully",
            imageUrl,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUsername = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { username } = req.body;

        const updatedUsername = await userService.updateUsername(userId, username);

        res.status(200).json({
            success: true,
            message: "Username updated successfully",
            username: updatedUsername
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await userService.deleteAccount(userId);

        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Account deleted"
        });

    } catch (err) {
        next(err);
    }
};