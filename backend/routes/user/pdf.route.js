const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/auth.middleware");
const pdfController = require("../../controllers/user/pdf.controller");

router.get("/:id/download", isAuthenticated, pdfController.download);

module.exports = router;
