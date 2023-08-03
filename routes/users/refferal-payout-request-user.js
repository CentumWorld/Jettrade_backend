const express = require("express");
const router = express.Router();
require("dotenv").config();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/refferal-payout-request-user",
  authenticateUser,
  authorizeUser,
  userController.refferalPayoutRequestUser
);

module.exports = router;
