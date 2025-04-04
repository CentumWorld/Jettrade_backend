const express = require("express");
const router = express.Router();

const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");
const adminController = require("../controllers/adminController");

router.post(
  "/fetch-trading-value-adding-history",
  authenticateAdmin,
  authorizeRole(["admin", "subAdmin"]),
  adminController.fetchTradingValueAddingHistory
);

module.exports = router;