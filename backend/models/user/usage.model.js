const { getDB } = require("../../config/db.config");

// 🔹 Find Usage (can optionally use connection)
exports.findByUserId = async (userId, connection = null) => {
    const db = connection || getDB();

    const [rows] = await db.query(
        `SELECT * FROM user_usage WHERE user_id = ?`,
        [userId]
    );

    return rows[0];
};

// 🔹 Create Usage Row
exports.create = async (userId, connection = null) => {
    const db = connection || getDB();

    await db.query(
        `
        INSERT INTO user_usage 
        (user_id, daily_count, daily_date, monthly_minutes)
        VALUES (?, 0, CURDATE(), 0)
        `,
        [userId]
    );
};

// 🔹 Update Usage
exports.update = async (
    userId,
    dailyCount,
    dailyDate,
    monthlyMinutes,
    connection = null
) => {
    const db = connection || getDB();

    await db.query(
        `
        UPDATE user_usage
        SET 
            daily_count = ?,
            daily_date = ?,
            monthly_minutes = ?
        WHERE user_id = ?
        `,
        [dailyCount, dailyDate, monthlyMinutes, userId]
    );
};
