const express = require('express');
const router = express.Router();


const paymentController = require('../../controllers/paymentController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/verify-payment', paymentController.verifyPayment);


module.exports = router;