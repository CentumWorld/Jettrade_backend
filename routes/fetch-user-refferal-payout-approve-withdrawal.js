const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-user-refferal-payout-approve-withdrawal',authenticateAdmin,authorizeAdmin, adminController.fetchUserRefferalPayoutApproveWithdrawal);


module.exports = router;