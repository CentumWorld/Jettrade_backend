const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-refferal-payout-withdrawal-request',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchRefferalPayoutWithdrawalRequest);


module.exports = router;