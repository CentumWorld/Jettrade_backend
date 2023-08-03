const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-user-notification",
  authenticateUser,
  authorizeUser,
  userController.fetchUserNotification
);

module.exports = router;
