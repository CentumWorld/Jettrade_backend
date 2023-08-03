const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/save-user-edited-details",
  authenticateUser,
  authorizeUser,
  userController.saveEditedUserDetails
);

module.exports = router;
