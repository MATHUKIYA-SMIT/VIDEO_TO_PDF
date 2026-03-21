const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const isAuthorized = require("../../middlewares/role.middleware");

const userController = require("../../controllers/admin/user.controller");

router.use(isAuthenticated, isAuthorized("ADMIN"));

router.get("/pending-review", userController.getUsersWithPendingReviews);
router.get("/approved-review", userController.getUsersWithApprovedReviews);
router.patch("/:id/suspend", userController.toggleStatus);
router.delete("/:id", userController.remove);

module.exports = router;
