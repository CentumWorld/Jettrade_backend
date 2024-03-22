const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/total-referral-payout-amount-trader",
  authenticateUser,
  authorizeUser,
  userController.totalReferralPayoutAmountTrader
);

module.exports = router;
