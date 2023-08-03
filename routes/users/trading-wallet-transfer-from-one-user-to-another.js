const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/trading-wallet-transfer-from-one-user-to-another",
  authenticateUser,
  authorizeUser,
  userController.tradingWalletTransferFromOneUserToAnother
);

module.exports = router;
