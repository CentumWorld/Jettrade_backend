const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-franchise-credit-wallet-transaction-details',authenticateAdmin,authorizeAdmin,adminController.fetchFranchiseCreditwalletTransactionDetails);


module.exports = router;