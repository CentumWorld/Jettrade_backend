const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-own-referral-payout",
  authenticateUser,
  authorizeRole(["user"]),
  userController.traderFetchOwnReferralPayout
);

module.exports = router;
