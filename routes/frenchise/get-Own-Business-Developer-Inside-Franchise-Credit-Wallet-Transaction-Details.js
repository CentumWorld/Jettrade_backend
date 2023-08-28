const express = require("express");
const router = express.Router();
const { getOwnBusinessDeveloperInsideFranchiseCreditWalletTransactionDetails } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-own-business-developer-inside-franchise-credit-wallet-transaction-details",authenticateAdmin,
authorizeRole(["franchise"])
,getOwnBusinessDeveloperInsideFranchiseCreditWalletTransactionDetails);

module.exports = router