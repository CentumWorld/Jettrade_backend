const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-chat-message-user",
  authenticateUser,
  authorizeUser,
  userController.fetchChatMessageUser
);

module.exports = router;
