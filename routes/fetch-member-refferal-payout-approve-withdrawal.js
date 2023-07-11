const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-member-refferal-payout-approve-withdrawal',checkMiddleware.checkAuth, adminController.fetchMemberRefferalPayoutApproveWithdrawal);


module.exports = router;