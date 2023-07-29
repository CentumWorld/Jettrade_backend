const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-total-withdrawal-from-trading-wallet',checkMiddleware.checkAuth,userController.userTotalWithdrawalFromTradingWallet);

module.exports = router;