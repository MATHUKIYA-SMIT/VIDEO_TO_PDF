const cron = require("node-cron");
const authRepository = require("../models/user/auth.model");

const startCleanupJob = () => {
    // Runs every 10 minutes
    cron.schedule("*/10 * * * *", async () => {
        try {
            await authRepository.deleteExpiredUnverifiedUsers();
            console.log("Expired unverified users cleaned up");
        } catch (error) {
            console.error("Cleanup error:", error.message);
        }
    });
};

module.exports = startCleanupJob;
