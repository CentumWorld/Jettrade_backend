const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/total-referral-payout-amount",
  authenticateMember,
  authorizeMember,
  memberController.totalReferralPayoutAmount
);

module.exports = router;
