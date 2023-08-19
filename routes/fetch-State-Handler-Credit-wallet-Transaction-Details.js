const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-state-handler-wallet-transaction-details',authenticateAdmin,authorizeAdmin, adminController.fetchStateHandlerCreditwalletTransactionDetails);


module.exports = router;