const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/fetch-member-refferal-payout-request-withdrawal",
  authenticateMember,
  authorizeMember,
  memberController.fetchMemberRefferalPayoutRequestWithdrawal
);

module.exports = router;
