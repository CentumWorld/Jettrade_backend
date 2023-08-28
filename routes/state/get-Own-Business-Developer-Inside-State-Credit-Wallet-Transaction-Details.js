const express = require("express");
const router = express.Router();

const {  getOwnBusinessDeveloperInsideStateCreditWalletTransactionDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-business-developer-inside-state-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["state"]),getOwnBusinessDeveloperInsideStateCreditWalletTransactionDetails);
module.exports = router;
