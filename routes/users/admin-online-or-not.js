const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.get(
  "/users/admin-online-or-not",
  authenticateUser,
  authorizeUser,
  userController.AdminOnlineOrNot
);

module.exports = router;
