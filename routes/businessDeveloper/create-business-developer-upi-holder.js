const express = require("express");
const router = express.Router();

const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

const {
  createBusinessDeveloperUpiHolder
} = require("../../controllers/businessDevController");
router.post(
  "/create-business-developer-upi-holder",
  authenticateAdmin,
  authorizeRole(["businessDeveloper"]),
  createBusinessDeveloperUpiHolder);
module.exports = router;
