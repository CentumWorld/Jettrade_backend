const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.get(
  "/fetch-refferal-note",
  authenticateMember,
  authorizeMember,
  memberController.fetchReferralNote
);

module.exports = router;
