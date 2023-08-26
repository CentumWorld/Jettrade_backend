const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-franchise-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["admin", "state"]),adminController.fetchFranchiseCreditwalletTransactionDetails);


module.exports = router;