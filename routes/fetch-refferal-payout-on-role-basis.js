const express = require("express");
const router = express.Router();
require("dotenv").config();

const adminController = require("../controllers/adminController");
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post(
  "/fetch-refferal-payout-on-role-basis",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.fetchRefferalPayoutOnRoleBasis
);

module.exports = router;
