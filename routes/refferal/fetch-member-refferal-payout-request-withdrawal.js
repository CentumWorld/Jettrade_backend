const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/fetch-member-refferal-payout-request-withdrawal',checkMiddleware.checkAuth,memberController.fetchMemberRefferalPayoutRequestWithdrawal);

module.exports = router;