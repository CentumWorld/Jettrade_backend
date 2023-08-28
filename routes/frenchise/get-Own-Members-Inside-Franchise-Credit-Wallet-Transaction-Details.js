const express = require("express");
const router = express.Router();
const { getOwnMembersInsideFranchiseCreditWalletTransactionDetails } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-own-members-inside-franchise-credit-wallet-transaction-details",authenticateAdmin,
authorizeRole(["franchise"])
,getOwnMembersInsideFranchiseCreditWalletTransactionDetails);

module.exports = router