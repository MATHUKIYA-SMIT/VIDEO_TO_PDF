const reviewRepository = require("../../models/user/review.model");
const AppError = require("../../utils/AppError");
const {predictReviewSentiment} = require("../../utils/pythonClient");

exports.submit = async (userId, data) => {
    const rating = Number(data.rating);
    const comment = data.comment?.trim();

    if (!comment || comment.length < 5) {
        throw new AppError("Comment must have at least 5 characters", 400);
    }
    if (!rating || rating < 1 || rating > 5) {
        throw new AppError("Rating must be between 1 and 5", 400);
    }
    const existing = await reviewRepository.findByUserId(userId);
    if (existing) {
        throw new AppError("Review already exists", 409);
    }

    const sentimentResponse = await predictReviewSentiment({review: comment});
    const sentiment = sentimentResponse.sentiment;

    const id = await reviewRepository.create({
        userId,
        rating,
        comment,
        sentiment
    });

    return {id};
};

exports.getAll = async (userId) => {
    return await reviewRepository.findApproved(userId);
};

exports.getMine = async (userId) => {
    return await reviewRepository.findByUserId(userId);
};

exports.update = async (reviewId, userId, data) => {
    const rating = Number(data.rating);
    const comment = data.comment?.trim();

    if (!comment || comment.length < 5) {
        throw new AppError("Comment must have at least 5 characters", 400);
    }

    if (!rating || rating < 1 || rating > 5) {
        throw new AppError("Rating must be between 1 and 5", 400);
    }
    const sentimentResponse = await predictReviewSentiment({review: comment});
    const sentiment = sentimentResponse.sentiment;

    const affectedRows = await reviewRepository.updateByIdAndUser(
        reviewId,
        userId,
        rating,
        comment,
        sentiment
    );

    if (!affectedRows) {
        throw new AppError("Review not found or not authorized", 404);
    }

    return reviewId;
};
