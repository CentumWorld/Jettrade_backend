const express = require("express");
const router = express.Router();
//require('dotenv').config();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/save-member-edited-details",
  authenticateMember,
  authorizeMember,
  memberController.saveMemberEditedDetails
);

module.exports = router;
