const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-approve-refferal-payout-user",
  authenticateUser,
  authorizeUser,
  userController.fetchApproveRefferalPayoutUser
);

module.exports = router;
