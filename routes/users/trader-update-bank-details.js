const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.put(
  "/trader-update-bank-details",
  authenticateUser,
  authorizeUser,
  userController.traderUpdateBankDetails
);

module.exports = router;
