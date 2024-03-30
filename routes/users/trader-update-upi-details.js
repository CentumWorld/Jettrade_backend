const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.put(
  "/trader-update-upi-details",
  authenticateUser,
  authorizeUser,
  userController.traderUpdateUpiDetails
);

module.exports = router;
