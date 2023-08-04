const express = require("express");
const router = express.Router();
require("dotenv").config();

const adminController = require("../controllers/adminController");
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post(
  "/fetch-refferal-payout-on-role-basis",
  authenticateAdmin,
  authorizeAdmin,
  adminController.fetchRefferalPayoutOnRoleBasis
);

module.exports = router;
