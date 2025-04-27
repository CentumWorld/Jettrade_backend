const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

// Route for withdrawing amount from trading wallet
router.post(
  "/withdrawal-from-profitWallet-to-bank-account",
  authenticateUser,
  authorizeUser,
  userController.withdrawalFromProfitWalletToBankAccount
);

module.exports = router;
