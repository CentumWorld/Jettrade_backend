const express = require('express');
const router = express.Router();


const paymentController = require('../../controllers/paymentController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.post('/users/user-adding-wallet-create-payment',authenticateUser,
authorizeUser, paymentController.userAddingWalletCreatePayment);


module.exports = router;