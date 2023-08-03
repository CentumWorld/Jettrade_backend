const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/fetch-chat-message-refferal",
  authenticateMember,
  authorizeMember,
  memberController.fetchChatMessageRefferal
);

module.exports = router;
