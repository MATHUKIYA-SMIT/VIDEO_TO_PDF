const usageService = require("../../services/user/usage.service");

exports.getUsage = async (req, res, next) => {
    try {
        const usage = await usageService.getUsage(req.user.id);

        res.status(200).json({
            success: true,
            message: "Usage fetched successfully",
            data: usage
        });

    } catch (err) {
        next(err);
    }
};
