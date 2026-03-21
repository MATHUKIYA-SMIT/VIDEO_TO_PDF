const userRepository = require("../../models/admin/user.model");
const AppError = require("../../utils/AppError");

exports.getUsersWithPendingReviews = async () => {
    return await userRepository.findUsersWithPendingReviews();
};

exports.getUsersWithApprovedReviews = async () => {
    return await userRepository.findUsersWithApprovedReviews();
};

exports.toggleStatus = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const newStatus =
        user.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";

    await userRepository.updateStatusById(userId, newStatus);
};

exports.remove = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    await userRepository.updateStatusById(userId, "DELETED");
};
