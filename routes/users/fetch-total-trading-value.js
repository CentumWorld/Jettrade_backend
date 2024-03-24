const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-total-trading-value",
  authenticateAdmin,
  authorizeRole(["user"]),

  userController.fetchTotalTradingValue
);

module.exports = router;
