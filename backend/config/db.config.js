const mysql = require("mysql2/promise");

let pool;

const initDB = async () => {
    try {

        pool = mysql.createPool({
            host: process.env.MYSQLHOST,
            port: process.env.MYSQLPORT,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,

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