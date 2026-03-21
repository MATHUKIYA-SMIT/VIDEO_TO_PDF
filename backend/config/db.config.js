const mysql = require("mysql2/promise");

let pool;
const initDB = async () => {
    try{
        pool = mysql.createPool({
            host: "127.0.0.2",
            port: 3306,
            user: "root",
            password: "123456789",
            database: "video_pdf_system",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            dateStrings: true
        });
        const connection = await pool.getConnection();
        console.log("✅ MySQL connected successfully");
        connection.release();

    } catch (err) {
        console.error("❌ MySQL connection failed:", err.message);
        process.exit(1);
    }
};
const getDB = () => pool;

module.exports = { initDB, getDB };
