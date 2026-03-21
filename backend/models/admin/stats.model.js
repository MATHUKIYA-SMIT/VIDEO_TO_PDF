const { getDB } = require("../../config/db.config");

// 🔹 Count active users
exports.countActiveUsers = async () => {
    const db = getDB();

    const [[row]] = await db.query(
        "SELECT COUNT(*) AS count FROM users WHERE status = 'ACTIVE'"
    );

    return row.count;
};

// 🔹 Count suspended users
exports.countSuspendedUsers = async () => {
    const db = getDB();

    const [[row]] = await db.query(
        "SELECT COUNT(*) AS count FROM users WHERE status = 'SUSPENDED'"
    );

    return row.count;
};

// 🔹 Count pending reviews
exports.countPendingReviews = async () => {
    const db = getDB();

    const [[row]] = await db.query(
        "SELECT COUNT(*) AS count FROM reviews WHERE status = 'PENDING'"
    );

    return row.count;
};

// 🔹 Count total PDFs
exports.countTotalPdfs = async () => {
    const db = getDB();

    const [[row]] = await db.query(
        "SELECT COUNT(*) AS count FROM pdfs"
    );

    return row.count;
};
