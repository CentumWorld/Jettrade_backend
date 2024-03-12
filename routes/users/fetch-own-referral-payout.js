const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
    authenticateUser,
    authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/fetch-own-referral-payout",
  authenticateUser,
  authorizeUser,
  userController.traderFetchOwnReferralPayout
);

module.exports = router;
