const { getDB } = require("../../config/db.config");


exports.findUsersWithPendingReviews = async () => {
    const db = getDB();

    const [rows] = await db.query(`
        SELECT 
            u.id,
            u.username,
            u.email,
            u.status,
            u.profile_image,
            r.created_at
        FROM users u
        JOIN reviews r ON u.id = r.user_id
        WHERE r.status = 'pending'
        AND u.status = 'ACTIVE'
        ORDER BY r.created_at ASC
    `);

    return rows;
};

exports.findUsersWithApprovedReviews = async () => {
    const db = getDB();

    const [rows] = await db.query(`
        SELECT 
            u.id,
            u.username,
            u.email,
            u.status,
            u.profile_image,
            r.id AS review_id,
            r.rating,
            r.comment,
            r.created_at
        FROM users u
        JOIN reviews r ON u.id = r.user_id
        WHERE r.status = 'approved'
        ORDER BY r.created_at DESC
    `);

    return rows;
};

// 🔹 Find user by ID
exports.findById = async (id) => {
    const db = getDB();

    const [[row]] = await db.query(
        "SELECT id, status FROM users WHERE id = ?",
        [id]
    );

    return row;
};

// 🔹 Update user status
exports.updateStatusById = async (id, status) => {
    const db = getDB();

    await db.query(
        "UPDATE users SET status = ? WHERE id = ?",
        [status, id]
    );
};
