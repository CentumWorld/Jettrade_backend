const express = require("express");
const router = express.Router()
const { getOwnMembersInsideBusinessDeveloperCreditWalletTransactionDetails } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-members-inside-business-developer-wallet-transaction-details',authenticateAdmin,authorizeRole(["businessDeveloper"]),getOwnMembersInsideBusinessDeveloperCreditWalletTransactionDetails);
module.exports = router;
