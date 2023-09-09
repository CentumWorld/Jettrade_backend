const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/create-user-bank-account-holder",
  authenticateUser,
  authorizeUser,
  userController.createUserBankAccountHolder
);

module.exports = router;
