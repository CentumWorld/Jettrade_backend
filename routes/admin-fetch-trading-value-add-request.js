const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.get(
  "/admin-fetch-trading-value-add-request",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.adminFetchTradingValueAddRequest
);

module.exports = router;
