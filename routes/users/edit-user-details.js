const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/edit-user-details",
  authenticateUser,
  authorizeUser,
  userController.editUserDetails
);

module.exports = router;
