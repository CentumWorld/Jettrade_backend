const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-profile-photo-user",
  authenticateUser,
  authorizeUser,
  userController.fetchProfilePhotoUser
);

module.exports = router;
