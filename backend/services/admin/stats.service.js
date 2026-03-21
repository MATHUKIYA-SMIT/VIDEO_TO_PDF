const dashboardRepository = require("../../models/admin/stats.model");

exports.getStats = async () => {
    const [
        activeUsers,
        suspendedUsers,
        pendingReviews,
        totalPdfs
    ] = await Promise.all([
        dashboardRepository.countActiveUsers(),
        dashboardRepository.countSuspendedUsers(),
        dashboardRepository.countPendingReviews(),
        dashboardRepository.countTotalPdfs()
    ]);

    return {
        activeUsers,
        suspendedUsers,
        pendingReviews,
        totalPdfs
    };
};
