const express = require("express");
const router = express.Router();
require("dotenv").config();

const adminController = require("../controllers/adminController");
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get(
  "/fetch-refferal-payout-member",
  authenticateAdmin,
  authorizeAdmin,
  adminController.fetchRefferalPayoutMember
);

module.exports = router;
