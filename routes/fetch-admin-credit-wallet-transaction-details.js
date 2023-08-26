const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-admin-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchAdminCreditwalletTransactionDetails);


module.exports = router;