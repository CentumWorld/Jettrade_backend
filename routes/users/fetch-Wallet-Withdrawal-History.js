const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-Wallet-Withdrawal-History",
  authenticateUser,
  authorizeUser,
  userController.fetchWalletWithdrawalHistory
);

module.exports = router;
