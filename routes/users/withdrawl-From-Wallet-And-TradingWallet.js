const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');



// Route for withdrawing amount from trading wallet
router.post('/users/withdrawl-From-Wallet-And-TradingWallet',checkMiddleware.checkAuth,userController.withdrawlFromWalletAndTradingWallet);

module.exports = router;
