const express = require('express');
const router = express.Router();


const paymentController = require('../../controllers/paymentController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.post('/users/user-adding-wallet-verify-payment', authenticateUser,
authorizeUser,paymentController.userAddingWalletVerifyPayment);


module.exports = router;