const mysql = require("mysql2/promise");

let pool;

const initDB = async () => {
    try {

        const isProduction = process.env.NODE_ENV === "production";

        pool = mysql.createPool({
            host: isProduction
                ? process.env.MYSQLHOST
                : process.env.MYSQL_HOST,

            port: isProduction
                ? process.env.MYSQLPORT
                : process.env.MYSQL_PORT,

            user: isProduction
                ? process.env.MYSQLUSER
                : process.env.MYSQL_USER,

            password: isProduction
                ? process.env.MYSQLPASSWORD
                : process.env.MYSQL_PASS,

            database: isProduction
                ? process.env.MYSQLDATABASE
                : "video_pdf_system",

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