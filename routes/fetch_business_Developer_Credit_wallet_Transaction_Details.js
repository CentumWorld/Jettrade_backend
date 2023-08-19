const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-business-developer-credit-wallet-transaction-details-membe',authenticateAdmin,authorizeAdmin, adminController.fetchBusinessDeveloperCreditwalletTransactionDetails);


module.exports = router;