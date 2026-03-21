const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const isAuthorized = require("../../middlewares/role.middleware");

const reviewController = require("../../controllers/admin/review.controller");

// Apply middleware once for all routes
router.use(isAuthenticated, isAuthorized("ADMIN"));

router.get("/user/:userId", reviewController.getUserReview);
router.patch("/:id/approve", reviewController.approve);
router.patch("/:id/reject", reviewController.reject);

module.exports = router;
