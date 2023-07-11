const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
//const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/change-user-payment-status',userController.changeUserPaymentStatus);

module.exports = router;