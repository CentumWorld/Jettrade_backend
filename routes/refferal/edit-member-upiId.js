const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/edit-member-upiId",
  authenticateMember,
  authorizeMember,
  memberController.editMemberUpiId
);

module.exports = router;
