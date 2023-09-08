const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/create-member-upi-holder",
  authenticateMember,
  authorizeMember,
  memberController.createMemberUpiHolder
);

module.exports = router;
