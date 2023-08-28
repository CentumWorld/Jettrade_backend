const express = require("express");
const router = express.Router();
const { getOwnFranchiseCreditWalletTransactionDetails } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-own-franchise-credit-wallet-transaction-details",authenticateAdmin,
authorizeRole(["franchise"])
,getOwnFranchiseCreditWalletTransactionDetails);

module.exports = router