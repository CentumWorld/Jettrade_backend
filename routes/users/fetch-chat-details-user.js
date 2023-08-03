const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-chat-details-user",
  authenticateUser,
  authorizeUser,
  userController.fetchChatDetailsUser
);

module.exports = router;
