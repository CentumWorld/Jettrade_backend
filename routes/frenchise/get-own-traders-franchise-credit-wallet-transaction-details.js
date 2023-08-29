const express = require("express");
const router = express.Router();
const { getOwnTradersInsideFranchiseCreditWalletTransactionDetails } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-own-traders-inside-franchise-credit-wallet-transaction-details",authenticateAdmin,
authorizeRole(["franchise"])
,getOwnTradersInsideFranchiseCreditWalletTransactionDetails);

module.exports = router