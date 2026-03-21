const { getDB } = require("../../config/db.config");

// 🔹 Insert video record
exports.create = async ({ userId, url, durationSeconds, videoName, videoPath, status }, connection=null) => {
    const db = connection || getDB();

    const [result] = await db.query(
        `
        INSERT INTO videos (user_id, url, duration_seconds, video_name, video_path, status)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [userId, url, durationSeconds, videoName, videoPath, status]
    );

    return result.insertId;
};

// 🔹 Update video status
exports.updateStatus = async ( id, status, videoName = null, videoPath = null, connection=null ) => {
    const db = connection || getDB();

    let query = `UPDATE videos SET status = ?`;
    const params = [status];

    if (videoName) {
        query += `, video_name = ?`;
        params.push(videoName);
    }

    if (videoPath) {
        query += `, video_path = ?`;
        params.push(videoPath);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await db.query(query, params);
};

// 🔹 Get all videos for user
exports.findByUserId = async (userId) => {
    const db = getDB();

    const [rows] = await db.query(
        `
        SELECT 
            id,
            url,
            duration_seconds,
            uploaded_at
        FROM videos
        WHERE user_id = ?
        ORDER BY uploaded_at DESC
        `,
        [userId]
    );

    return rows;
};
