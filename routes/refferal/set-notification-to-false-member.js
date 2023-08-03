const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/set-notification-to-false-member",
  authenticateMember,
  authorizeMember,
  memberController.setNotificationToFalseMember
);

module.exports = router;
