const usageRepository = require("../../models/user/usage.model");
const AppError = require("../../utils/AppError");

const DAILY_LIMIT = 3;
const MONTHLY_MINUTES_LIMIT = 120;
const SINGLE_VIDEO_LIMIT = 30;


exports.getUsage = async (userId) => {

    let usage = await usageRepository.findByUserId(userId);

    if (!usage) {
        await usageRepository.create(userId);
        usage = await usageRepository.findByUserId(userId);
    }

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentMonth = now.toISOString().slice(0, 7);

    const dbDailyDate = usage.daily_date
        ? new Date(usage.daily_date).toISOString().split("T")[0]
        : null;

    const dbMonth = usage.daily_date
        ? new Date(usage.daily_date).toISOString().slice(0, 7)
        : null;

    let shouldUpdate = false;

    if (dbDailyDate !== today) {
        usage.daily_count = 0;
        shouldUpdate = true;
    }

    if (dbMonth !== currentMonth) {
        usage.monthly_minutes = 0;
        shouldUpdate = true;
    }

    if (shouldUpdate) {
        await usageRepository.update(
            userId,
            usage.daily_count,
            today,
            usage.monthly_minutes
        );
    }

    return usage;
};

// 🔹 Check & Update Usage (Used by video.service)
exports.checkAndUpdateUsage = async (userId, videoDurationMinutes, connection = null) => {

    if (videoDurationMinutes > SINGLE_VIDEO_LIMIT) {
        throw new AppError("Video cannot be more than 30 minutes", 400);
    }

    let usage = await usageRepository.findByUserId(userId, connection);

    if (!usage) {
        await usageRepository.create(userId, connection);
        usage = await usageRepository.findByUserId(userId, connection);
    }

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentMonth = now.toISOString().slice(0, 7);


    // Convert DB daily_date safely
    const dbDailyDate = usage.daily_date
        ? new Date(usage.daily_date).toISOString().split("T")[0]
        : null;

    const dbMonth = usage.daily_date
        ? new Date(usage.daily_date).toISOString().slice(0, 7)
        : null;

    // 🔹 Reset daily if new day
    if (dbDailyDate !== today) {
        usage.daily_count = 0;
    }

    // 🔹 Reset monthly if new month
    if (dbMonth !== currentMonth) {
        usage.monthly_minutes = 0;
    }

    // 🔹 Check limits
    if (usage.daily_count >= DAILY_LIMIT) {
        throw new AppError("Daily limit reached (3 videos per day)", 400);
    }

    if ((usage.monthly_minutes + videoDurationMinutes) > MONTHLY_MINUTES_LIMIT) {
        throw new AppError("Monthly 120 minute limit reached", 400);
    }

    // 🔹 Update usage
    const newDaily = usage.daily_count + 1;
    const newMonthly = usage.monthly_minutes + videoDurationMinutes;

    await usageRepository.update(
        userId,
        newDaily,
        today,
        newMonthly,
        connection
    );

    return {
        dailyUsed: newDaily,
        monthlyUsed: newMonthly,
        dailyLimit: DAILY_LIMIT,
        monthlyLimit: MONTHLY_MINUTES_LIMIT
    };
};
