const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

// Route for withdrawing amount from trading wallet
router.post(
  "/users/withdrawl-From-Wallet-And-TradingWallet",
  authenticateUser,
  authorizeUser,
  userController.withdrawlFromWalletAndTradingWallet
);

module.exports = router;
