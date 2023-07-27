const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/adding-amount-to-trading-wallet',userController.addingAmountToTradingWallet);

module.exports = router;