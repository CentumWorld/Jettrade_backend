const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../middleware/checkAuth");

router.post(
  "/filter-credit-wallet-transaction-by-userid",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.filterCreditWalletTransactionByUserId
);

module.exports = router;
