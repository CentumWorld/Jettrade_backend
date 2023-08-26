const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-state-handler-wallet-transaction-details',authenticateAdmin,authorizeRole(["admin", "state"]), adminController.fetchStateHandlerCreditwalletTransactionDetails);


module.exports = router;