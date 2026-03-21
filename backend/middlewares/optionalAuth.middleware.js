const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
    const token = req.cookies?.token; // 👈 token stored in cookie

    if (!token) {
        return next(); // Not logged in
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        // Invalid token → ignore
    }

    next();
};

module.exports = optionalAuth;
