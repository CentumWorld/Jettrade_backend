const express = require("express");
const router = express.Router();

const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

const {
  createBusinessDeveloperBankAccountHolder
} = require("../../controllers/businessDevController");
router.post(
  "/create-business-developer-bank-account-holder",
  authenticateAdmin,
  authorizeRole(["businessDeveloper"]),
  createBusinessDeveloperBankAccountHolder
);
module.exports = router;
