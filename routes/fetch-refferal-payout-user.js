const express = require("express");
const router = express.Router();
require("dotenv").config();

const adminController = require("../controllers/adminController");
const {
  authenticateAdmin,
  authorizeAdmin,
  authorizeRole,
} = require("../middleware/checkAuth");

router.get(
  "/fetch-refferal-payout-user",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.fetchRefferalPayoutUser
);

module.exports = router;
