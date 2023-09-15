const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {authenticateUser,authorizeUser} = require("../../middleware/checkAuth");

router.put(
  "/change-payment-status",
  authenticateUser,
  authorizeUser,
  userController.changePaymentStatus
);

module.exports = router;
