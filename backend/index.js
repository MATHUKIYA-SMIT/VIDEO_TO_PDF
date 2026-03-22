require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { initDB } = require("./config/db.config.js");
const authRoutes = require("./routes/user/auth.route.js");
const userRoutes = require("./routes/user/user.route.js");
const reviewRoutes = require("./routes/user/review.route.js");
const videoRoutes = require("./routes/user/video.route.js");
const pdfRoutes = require("./routes/user/pdf.route.js");
const usageRoutes = require("./routes/user/usage.route.js");
const adminDashboardRoutes = require("./routes/admin/stats.route.js");
const adminUserRoutes = require("./routes/admin/user.route.js");
const adminReviewRoutes = require("./routes/admin/review.route");
const errorMiddleware = require("./middlewares/error.middleware");
const startCleanupJob = require("./utils/cleanupUnverifiedUsers");

(async () => {
    try {
        await initDB();
        // startCleanupJob();
    } catch (err) {
        console.error("DB connection failed:", err);
    }
})();

app.use(cors({ origin: "http://localhost:5173", credentials: true,}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/reviews", adminReviewRoutes);

app.get("/", (req, res) => {
    res.send("hello deshboard");
});

app.use(errorMiddleware);

module.exports = app;
