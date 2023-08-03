const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/fetch-member-notification-status",
  authenticateMember,
  authorizeMember,
  memberController.fetchMemberNotificationStatus
);

module.exports = router;
