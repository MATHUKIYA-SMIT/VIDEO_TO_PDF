const { getDB } = require("../../config/db.config");


exports.findByUserId = async (userId) => {
    const db = getDB();

    const [rows] = await db.query(`
        SELECT 
            id,
            rating,
            comment,
            status,
            created_at
        FROM reviews
        WHERE user_id = ?
        LIMIT 1
    `, [userId]);

    return rows[0];
};

// 🔹 Find review by ID
exports.findById = async (id) => {
    const db = getDB();

    const [[row]] = await db.query(
        `SELECT * FROM reviews WHERE id = ?`,
        [id]
    );

    return row;
};

// 🔹 Update review status
exports.updateStatusById = async (id, status) => {
    const db = getDB();

    await db.query(
        `UPDATE reviews SET status = ? WHERE id = ?`,
        [status, id]
    );
};
