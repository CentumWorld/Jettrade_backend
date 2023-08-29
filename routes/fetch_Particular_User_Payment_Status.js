const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const {
 
  authorizeAdmin,
  authenticateAdmin,
  authorizeRole,
} = require("../middleware/checkAuth");

router.post(
  "/fetch_particular_user_payment_Status",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.fetchParticularUserPaymentStatus
);

module.exports = router;
