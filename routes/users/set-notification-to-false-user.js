const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/set-notification-to-false-user",
  authenticateUser,
  authorizeUser,
  userController.setNotificationToFalseUser
);

module.exports = router;
