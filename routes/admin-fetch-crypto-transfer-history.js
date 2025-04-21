const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.post(
  "/admin-fetch-crypto-transfer-history",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.adminFetchCryptoTransferHistory
);

module.exports = router;