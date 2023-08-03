const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post("/users/payment-userid-verify", userController.paymentUseridVerify);

router.get(
  "/fetch-userid",
  authenticateUser,
  authorizeUser,
  userController.fetchUserid
);

module.exports = router;
