const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/adding-amount-to-trading-wallet",
  authenticateUser,
  authorizeUser,
  userController.addingAmountToTradingWallet
);

module.exports = router;
