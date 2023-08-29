const express = require("express");
const router = express.Router();
require("dotenv").config();

const adminController = require("../controllers/adminController");
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get(
  "/fetch-refferal-payout-member",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.fetchRefferalPayoutMember
);

module.exports = router;
