const express = require('express');
const router = express.Router();


const paymentController = require('../../controllers/paymentController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-adding-wallet-verify-payment', paymentController.userAddingWalletVerifyPayment);


module.exports = router;