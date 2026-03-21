const reviewRepository = require("../../models/admin/review.model");
const AppError = require("../../utils/AppError");


exports.getUserReview = async (userId) => {
    return await reviewRepository.findByUserId(userId);
};

exports.approve = async (reviewId) => {
    const review = await reviewRepository.findById(reviewId);

    if (!review) {
        throw new AppError("Review not found", 404);
    }

    await reviewRepository.updateStatusById(reviewId, "approved");
    return review;
};

exports.reject = async (reviewId) => {
    const review = await reviewRepository.findById(reviewId);

    if (!review) {
        throw new AppError("Review not found", 404);
    }

    await reviewRepository.updateStatusById(reviewId, "rejected");
    return review;
};
