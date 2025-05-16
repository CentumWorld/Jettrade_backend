const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.put(
  "/admin-approve-add-trading-value-request",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.adminApproveAddTradingValueRequest
);

module.exports = router;
