const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');



// Route for withdrawing amount from trading wallet
router.post('/users/withdrawl-amount-from-trading-wallet',authenticateUser,authorizeUser,userController.withdrawlAmountFromTradingWallet);

module.exports = router;
