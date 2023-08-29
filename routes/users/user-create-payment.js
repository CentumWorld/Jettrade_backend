const express = require('express');
const router = express.Router();


const paymentController = require('../../controllers/paymentController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.post('/users/user-create-payment',paymentController.userCreatePayment);


module.exports = router;