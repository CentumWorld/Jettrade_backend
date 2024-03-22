const express = require("express");
const router = express.Router();

const {  totalReferralPayoutAmountBMM } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/total-referral-payout-amount-bmm',authenticateAdmin,authorizeRole(["state"]),totalReferralPayoutAmountBMM);
module.exports = router;
