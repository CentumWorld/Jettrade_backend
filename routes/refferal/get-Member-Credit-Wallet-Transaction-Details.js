const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/get-own-member-credit-wallet-transaction-details",
  authenticateMember,
  authorizeMember,
  memberController.getOwnMemberCreditWalletTransactionDetails
);

module.exports = router;
