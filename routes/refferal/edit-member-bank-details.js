const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/edit-member-bank-details",
  authenticateMember,
  authorizeMember,
  memberController.editMemberBankDetails
);

module.exports = router;
