const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-fetch-refferal-payout-withdrawal-request',checkMiddleware.checkAuth,userController.userFetchRefferalPayoutWithdrawalRequest);

module.exports = router;