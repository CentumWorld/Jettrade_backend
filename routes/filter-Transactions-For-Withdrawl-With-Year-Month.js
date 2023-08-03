const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const {
  authenticateAdmin,
  authorizeAdmin,
} = require("../middleware/checkAuth");

router.post(
  "/filter-Transactions-For-Withdrawl-With-Year-Month",
  authenticateAdmin,
  authorizeAdmin,
  adminController.filterTransactionsForWithdrawlWithYearMonth
);

module.exports = router;
