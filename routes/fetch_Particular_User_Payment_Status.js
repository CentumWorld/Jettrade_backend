const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const {
 
  authorizeAdmin,
  authenticateAdmin,
} = require("../middleware/checkAuth");

router.post(
  "/fetch_particular_user_payment_Status",
  authenticateAdmin,
  authorizeAdmin,
  adminController.fetchParticularUserPaymentStatus
);

module.exports = router;
