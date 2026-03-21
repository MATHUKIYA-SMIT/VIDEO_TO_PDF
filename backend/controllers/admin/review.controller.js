const reviewService = require("../../services/admin/review.service");
const { getIO } = require("../../socket");


exports.getUserReview = async (req, res, next) => {
    try {
        const review = await reviewService.getUserReview(req.params.userId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "No review found",
            });
        }

        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (err) {
        next(err);
    }
};

exports.approve = async (req, res, next) => {
    try {
        const review = await reviewService.approve(req.params.id);

        const io = getIO();
        io.to("admin-room").emit("review:statusChanged");           // 🔵 Notify admins
        io.to(`user-${review.user_id}`).emit("review:approved");     // 🟢 Notify specific user

        return res.status(200).json({
            success: true,
            message: "Review approved",
        });
    } catch (err) {
        next(err);
    }
};

exports.reject = async (req, res, next) => {
    try {
        const review = await reviewService.reject(req.params.id);
        
        const io = getIO();
        io.to("admin-room").emit("review:statusChanged");           // 🔵 Notify admins
        io.to(`user-${review.user_id}`).emit("review:rejected");     // 🟢 Notify specific user

        return res.status(200).json({
            success: true,
            message: "Review rejected",
        });
    } catch (err) {
        next(err);
    }
};
