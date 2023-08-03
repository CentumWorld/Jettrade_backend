const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/fetch-chat-details-refferal",
  authenticateMember,
  authorizeMember,
  memberController.fetchChatDetailsRefferal
);

module.exports = router;
