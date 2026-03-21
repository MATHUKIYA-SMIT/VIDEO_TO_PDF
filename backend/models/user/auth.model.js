const { getDB } = require("../../config/db.config");

// 🔹 Find full user
exports.findUserByEmail = async (email) => {
    const db = getDB();

    const [rows] = await db.query(
        `
        SELECT id, email, username, password_hash, role, 
        is_verified, email_otp, otp_expiry,
        auth_provider, profile_image, status, theme
        FROM users
        WHERE email = ?
        `,
        [email]
    );

    return rows[0];
};

// 🔹 Insert user
exports.insertUser = async ({
    email,
    username,
    passwordHash,
    emailOtp,
    otpExpiry
}) => {
    const db = getDB();

    await db.query(
        `
        INSERT INTO users 
        (email, username, password_hash, auth_provider, email_otp, otp_expiry)
        VALUES (?, ?, ?, 'local', ?, ?)
        `,
        [email, username, passwordHash, emailOtp, otpExpiry]
    );
};

exports.insertGoogleUser = async ({
    email,
    username,
    profileImage
}) => {
    const db = getDB();

    await db.query(
        `
        INSERT INTO users
        (email, username, password_hash, auth_provider, 
        is_verified, profile_image)
        VALUES (?, ?, NULL, 'google', TRUE, ?)
        `,
        [email, username, profileImage]
    );
};

exports.updatePassword = async (email, passwordHash) => {
    const db = getDB();

    await db.query(
        `
        UPDATE users
        SET password_hash = ?,
            email_otp = NULL,
            otp_expiry = NULL
        WHERE email = ?
        `,
        [passwordHash, email]
    );
};

// 🔹 Mark verified
exports.markUserVerified = async (email) => {
    const db = getDB();

    await db.query(
        `
        UPDATE users
        SET is_verified = TRUE,
            email_otp = NULL,
            otp_expiry = NULL
        WHERE email = ?
        `,
        [email]
    );
};

exports.updateUserOTP = async (email, otp, expiry) => {
    const db = getDB();

    await db.query(
        `
        UPDATE users
        SET email_otp = ?, otp_expiry = ?
        WHERE email = ?
        `,
        [otp, expiry, email]
    );
};

exports.deleteUserByEmail = async (email) => {
    const db = getDB();

    await db.query(
        `DELETE FROM users WHERE email = ? AND is_verified = FALSE`,
        [email]
    );
};

//used by utils/cleanupUnverifiedUser.js
exports.deleteExpiredUnverifiedUsers = async () => { 
    const db = getDB();

    await db.query(
        `
        DELETE FROM users
        WHERE is_verified = FALSE
        AND otp_expiry < NOW()
        `
    );
};