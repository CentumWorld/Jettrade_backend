const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-franchise-payment-withdrawl-request',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchFranchisePaymentWithdrawalRequest);


module.exports = router;