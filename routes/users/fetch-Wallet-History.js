const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-Wallet-History",
  authenticateUser,
  authorizeUser,
  userController.fetchWalletHistory
);

module.exports = router;
