const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-member-profile-photo",
  authenticateMember,
  authorizeMember,
  memberController.fetchMemberProfilePhoto
);

module.exports = router;
