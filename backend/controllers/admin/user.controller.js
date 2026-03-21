const userService = require("../../services/admin/user.service");

exports.getUsersWithPendingReviews = async (req, res, next) => {
    try {
        const users = await userService.getUsersWithPendingReviews();

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

exports.getUsersWithApprovedReviews = async (req, res, next) => {
    try {
        const users = await userService.getUsersWithApprovedReviews();

        res.status(200).json({
        success: true,
        data: users,
        });
    } catch (err) {
        next(err);
    }
};

exports.toggleStatus = async (req, res, next) => {
    try {
        await userService.toggleStatus(req.params.id);

        res.status(200).json({
            success: true,
            message: "User status updated successfully"
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await userService.remove(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
