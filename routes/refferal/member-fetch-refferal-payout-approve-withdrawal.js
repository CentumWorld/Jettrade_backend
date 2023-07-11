const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/member-fetch-refferal-payout-approve-withdrawal',checkMiddleware.checkAuth,memberController.memberFetchRefferalPayoutApproveWithdrawal);

module.exports = router;