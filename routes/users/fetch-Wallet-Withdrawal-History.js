const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-Wallet-Withdrawal-History',checkMiddleware.checkAuth, userController.fetchWalletWithdrawalHistory);


module.exports = router;