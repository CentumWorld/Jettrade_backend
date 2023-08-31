const express = require("express");
const router = express.Router();

const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

const {
  createBusinessDeveloperPaymentRequest,
} = require("../../controllers/businessDevController");
router.post(
  "/create-business-developer-payment-request",
  authenticateAdmin,
  authorizeRole(["businessDeveloper"]),
  createBusinessDeveloperPaymentRequest
);
module.exports = router;
