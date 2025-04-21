const express = require("express");
const router = express.Router();
require("dotenv").config();

const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.post(
  "/give-crypto-transfer-option",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.giveCryptoTransferOption
);

module.exports = router;
