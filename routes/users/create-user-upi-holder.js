const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/create-user-upi-holder",
  authenticateUser,
  authorizeUser,
  userController.createUserUpiHolder
);

module.exports = router;
