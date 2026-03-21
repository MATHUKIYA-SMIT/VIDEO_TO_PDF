const { getDB } = require("../../config/db.config");

// 🔹 Find user by ID
exports.findById = async (userId) => {
    const db = getDB();
    const [rows] = await db.query(
        "SELECT id, username, email, theme, role, profile_image FROM users WHERE id = ?",
        [userId]
    );

    return rows[0];
};

// 🔹 Update user theme
exports.updateTheme = async (userId, theme) => {
    const db = getDB();
    await db.query(
        "UPDATE users SET theme = ? WHERE id = ?",
        [theme, userId]
    );
};

// 🔹 Update profile image
exports.updateProfileImage = async (userId, imageUrl, publicId) => {
    const db = getDB();
    await db.query(
        `UPDATE users 
        SET profile_image = ?, cloudinary_public_id = ? 
        WHERE id = ?`,
        [imageUrl, publicId, userId]
    );
};

// 🔹 Update username
exports.updateUsername = async (userId, username) => {
    const db = getDB();
    await db.query(
        "UPDATE users SET username = ? WHERE id = ?",
        [username, userId]
    );
};

exports.markAsDeleted = async (userId) => {
    const db = getDB();

    await db.query(
        `UPDATE users 
        SET status = 'DELETED',
        profile_image = '/images/default-avatar.png'
        WHERE id = ?`,
        [userId]
    );
};