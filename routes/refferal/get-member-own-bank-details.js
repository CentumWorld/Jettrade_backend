const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/get-member-own-bank-details",
  authenticateMember,
  authorizeMember,
  memberController.getMemberOwnBankDetails
);

module.exports = router;
