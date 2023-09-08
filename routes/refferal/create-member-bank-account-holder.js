const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/create-member-bank-account-holder",
  authenticateMember,
  authorizeMember,
  memberController.createMemberBankAccountHolder
);

module.exports = router;
