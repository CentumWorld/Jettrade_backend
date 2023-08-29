const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {authenticateUser,authorizeUser} = require("../../middleware/checkAuth");

router.post(
  "/users/change-payment-status-for-renewal",
  authenticateUser,
  authorizeUser,
  userController.changePaymentStatusForRenewal
);

module.exports = router;
