const express = require("express");
const router = express.Router();
require("dotenv").config();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/refferal-payout-request-member",
  authenticateMember,
  authorizeMember,
  memberController.refferalPayoutRequestMember
);

module.exports = router;
