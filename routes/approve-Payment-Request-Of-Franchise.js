const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.post(
  "/approve-payment-request-of-franchise",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.approvePaymentRequestOfFranchise
);

module.exports = router;
