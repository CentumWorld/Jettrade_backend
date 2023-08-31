const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.post(
  "/approve-payment-request-of-state",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.approvePaymentRequestOfState
);

module.exports = router;
