const express = require("express");
const router = express.Router();
const {
  getOwnTradersInsideBusinessDeveloperCreditWalletTransactionDetails,
} = require("../../controllers/businessDevController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
router.post(
  "/get-own-traders-inside-business-developer-wallet-transaction-details",
  authenticateAdmin,
  authorizeRole(["businessDeveloper"]),
  getOwnTradersInsideBusinessDeveloperCreditWalletTransactionDetails
);
module.exports = router;
