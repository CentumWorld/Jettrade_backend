const express = require("express");
const router = express.Router()
const { getOwnBusinessDeveloperWalletTransactionDetails } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-own-business-developer-wallet-transaction-details',authenticateAdmin,authorizeRole(["businessDeveloper"]),getOwnBusinessDeveloperWalletTransactionDetails);
module.exports = router;
