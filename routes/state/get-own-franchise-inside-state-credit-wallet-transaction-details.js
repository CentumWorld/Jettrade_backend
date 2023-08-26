const express = require("express");
const router = express.Router();

const {  getOwnFranchiseInsideStateCreditWalletTransactionDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-franchsie-inside-state-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["state"]),getOwnFranchiseInsideStateCreditWalletTransactionDetails);
module.exports = router;
