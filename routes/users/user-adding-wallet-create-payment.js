const express = require('express');
const router = express.Router();


const paymentController = require('../../controllers/paymentController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-adding-wallet-create-payment', paymentController.userAddingWalletCreatePayment);


module.exports = router;