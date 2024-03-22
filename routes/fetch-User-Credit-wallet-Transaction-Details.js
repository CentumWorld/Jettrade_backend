const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../middleware/checkAuth");

router.get(
  "/fetch-user-credit-wallet-transaction-details",
  authenticateAdmin,
  authorizeRole(["admin","subAdmin"]),
  adminController.fetchUserCreditwalletTransactionDetails
);

module.exports = router;
