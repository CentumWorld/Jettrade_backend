const express = require("express");
const router = express.Router();

const {  getOwnMemberInsideStateCreditWalletTransactionDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-members-inside-state-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["state"]),getOwnMemberInsideStateCreditWalletTransactionDetails);
module.exports = router;
