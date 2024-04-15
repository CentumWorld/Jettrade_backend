const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/expire-to-rigpartner",
  authenticateUser,
  authorizeUser,
  userController.expireToRig
);

module.exports = router;