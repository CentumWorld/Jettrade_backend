const express = require("express");
const router = express.Router();
require("dotenv").config();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-user-notification-status",
  authenticateUser,
  authorizeUser,
  userController.fetchUserNotificationStatus
);

module.exports = router;
