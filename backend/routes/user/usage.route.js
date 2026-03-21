const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/auth.middleware");
const usageController = require("../../controllers/user/usage.controller");

router.get("/", isAuthenticated, usageController.getUsage);

module.exports = router;
