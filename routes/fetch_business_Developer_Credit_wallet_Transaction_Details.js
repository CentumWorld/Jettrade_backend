const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-business-developer-credit-wallet-transaction-details-membe',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.fetchBusinessDeveloperCreditwalletTransactionDetails);


module.exports = router;