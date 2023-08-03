const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-refferal-payout-withdrawal-request',authenticateAdmin,authorizeAdmin, adminController.fetchRefferalPayoutWithdrawalRequest);


module.exports = router;