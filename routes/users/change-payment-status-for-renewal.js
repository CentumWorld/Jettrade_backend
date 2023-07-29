const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/change-payment-status-for-renewal',checkMiddleware.checkAuth,userController.changePaymentStatusForRenewal);

module.exports = router;