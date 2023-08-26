const express = require("express");
const router = express.Router();

const {  getOwnStateCreditWalletTransactionDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-state-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["state"]),getOwnStateCreditWalletTransactionDetails);
module.exports = router;
