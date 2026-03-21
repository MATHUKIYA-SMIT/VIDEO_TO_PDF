const reviewService = require("../../services/user/review.service");
const { getIO } = require("../../socket");

exports.submit = async (req, res, next) => {
    try {
        const result = await reviewService.submit(
            req.user.id,
            req.body
        );

        const io = getIO();
        io.emit("review:pending");

        res.status(201).json({
            success: true,
            message: result.updated
                ? "Review updated & sent for approval"
                : "Review submitted for approval",
            reviewId: result.id,
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const userId = req.user?.id || null;
        const reviews = await reviewService.getAll(userId);

        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (err) {
        next(err);
    }
};

exports.getMine = async (req, res, next) => {
    try {
        const review = await reviewService.getMine(req.user.id);

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

exports.update = async (req, res, next) => {
    try {
        const reviewId = req.params.id;

        const updatedId = await reviewService.update(
            reviewId,
            req.user.id,
            req.body
        );

        const io = getIO();
        io.emit("review:pending"); 

        return res.status(200).json({
            success: true,
            message: "Review updated and sent for approval",
            reviewId: updatedId,
        });
    } catch (err) {
        next(err);
    }
};
