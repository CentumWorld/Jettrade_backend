const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/transfer-profitWallet-to-cryptoWallet",
  authenticateUser,
  authorizeUser,
  userController.transferProfitWalletToCryptoWallet
);

module.exports = router;