module.exports = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    // 🔴 ALWAYS log full error (VERY IMPORTANT)
    console.error("🔥 ERROR:", {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    // 🟢 DEVELOPMENT MODE → show full error
    if (process.env.NODE_ENV === "development") {
        return res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        });
    }

    // 🔵 PRODUCTION MODE
    if (err.isOperational) {
        return res.status(statusCode).json({
        success: false,
        message: err.message, // safe message
        });
    }

    // 🔴 UNKNOWN / PROGRAMMING ERROR
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
};
