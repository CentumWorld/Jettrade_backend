const express = require("express");
const router = express.Router();

const {  getOwnTraderInsideStateCreditWalletTransactionDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-traders-inside-state-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["state"]),getOwnTraderInsideStateCreditWalletTransactionDetails);
module.exports = router;
