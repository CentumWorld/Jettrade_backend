const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-crypto-transfer-history",
  authenticateUser,
  authorizeUser,
  userController.fetchCryptoTransferHistory
);

module.exports = router;