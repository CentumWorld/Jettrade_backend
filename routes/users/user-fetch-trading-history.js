const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/user-fetch-trading-history",
  authenticateUser,
  authorizeUser,
  userController.userFetchTradingHistory
);

module.exports = router;