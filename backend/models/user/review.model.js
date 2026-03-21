const { getDB } = require("../../config/db.config");

// 🔹 Create review
exports.create = async ({ userId, rating, comment }) => {
    const db = getDB();

    const [result] = await db.query(
        `
        INSERT INTO reviews (user_id, rating, comment, status)
        VALUES (?, ?, ?, 'pending')
        `,
        [userId, rating, comment]
    );

    return result.insertId;
};


// 🔹 Find review by user
exports.findByUserId = async (userId) => {
    const db = getDB();

    const [rows] = await db.query(
        `SELECT * FROM reviews WHERE user_id = ? LIMIT 1`,
        [userId]
    );

    return rows[0];
};


// 🔹 Update review by ID
exports.updateById = async (id, { rating, comment }) => {
    const db = getDB();

    await db.query(
        `
        UPDATE reviews
        SET rating = ?, comment = ?, status = 'pending'
        WHERE id = ?
        `,
        [rating, comment, id]
    );
};

exports.findApproved = async (userId) => {
    const db = getDB();

    let query = `
        SELECT 
            r.id,
            r.rating,
            r.comment,
            r.updated_at,
            r.user_id,
            u.username,
            COALESCE(u.profile_image,'images/default-avatar.png') AS profile_image
        FROM reviews r
        INNER JOIN users u ON r.user_id = u.id
        WHERE r.status = 'approved'
    `;

    const params = [];

    // 🔥 If userId exists → prioritize that user
    if (userId) {
        query += `
            ORDER BY 
                CASE WHEN r.user_id = ? THEN 0 ELSE 1 END,
                r.created_at DESC
        `;
        params.push(userId);
    } else {
        query += `
            ORDER BY r.created_at DESC
        `;
    }

    const [rows] = await db.query(query, params);

    return rows;
};


// 🔹 Update review only if owner
exports.updateByIdAndUser = async (reviewId, userId, rating, comment) => {
    const db = getDB();

    const [result] = await db.query(
        `
        UPDATE reviews
        SET rating = ?, comment = ?, status = 'pending'
        WHERE id = ? AND user_id = ?
        `,
        [rating, comment, reviewId, userId]
    );

    return result.affectedRows;
};
