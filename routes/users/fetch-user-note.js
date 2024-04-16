const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.get(
  "/fetch-user-note",
  authenticateUser,
  authorizeUser,
  userController.fetchUserNote
);

module.exports = router;
