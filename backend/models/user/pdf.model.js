const { getDB } = require("../../config/db.config");

// 🔹 Insert new PDF record
exports.create = async ({ videoId, pdfName, pdfPath }, connection=null) => {
    const db = connection || getDB();

    const [result] = await db.query(
        `
        INSERT INTO pdfs (video_id, pdf_name, pdf_path)
        VALUES (?, ?, ?)
        `,
        [videoId, pdfName, pdfPath]
    );

    return result.insertId;
};


// 🔹 Find PDF by ID (with ownership info)
exports.findById = async (pdfId) => {
    const db = getDB();

    const [rows] = await db.query(
        `
        SELECT p.id, p.pdf_name, p.pdf_path, v.user_id
        FROM pdfs p
        JOIN videos v ON p.video_id = v.id
        WHERE p.id = ?
        `,
        [pdfId]
    );

    return rows[0];
};
