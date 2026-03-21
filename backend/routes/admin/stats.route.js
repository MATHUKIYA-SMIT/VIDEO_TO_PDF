const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const isAuthorized = require("../../middlewares/role.middleware");

const dashboardController = require("../../controllers/admin/stats.controller");

router.use(isAuthenticated, isAuthorized("ADMIN"));

router.get("/stats", dashboardController.getStats);

module.exports = router;
