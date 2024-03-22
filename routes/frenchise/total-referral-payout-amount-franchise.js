const express = require("express");
const router = express.Router();
const { totalReferralPayoutAmountFranchise } = require("../../controllers/franchiseController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/frenchise/total-referral-payout-amount-franchise",
  // authenticateAdmin,
  // authorizeRole(["franchise"]),
  totalReferralPayoutAmountFranchise
);
module.exports = router;     
