const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-user-refferal-payout-approve-withdrawal',checkMiddleware.checkAuth, adminController.fetchUserRefferalPayoutApproveWithdrawal);


module.exports = router;