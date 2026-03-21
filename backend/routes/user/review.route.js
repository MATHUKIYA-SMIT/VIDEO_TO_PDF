const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const optionalAuth = require("../../middlewares/optionalAuth.middleware");
const reviewController = require("../../controllers/user/review.controller");

router.post("/", isAuthenticated, reviewController.submit);
router.get("/", optionalAuth, reviewController.getAll);
router.get("/me", isAuthenticated, reviewController.getMine);
router.patch("/:id", isAuthenticated, reviewController.update);

module.exports = router;
