const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/member-fetch-refferal-payout-approve-withdrawal",
  authenticateMember,
  authorizeMember,
  memberController.memberFetchRefferalPayoutApproveWithdrawal
);

module.exports = router;
