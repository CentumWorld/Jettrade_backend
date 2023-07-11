const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
//const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/payment-userid-verify', userController.paymentUseridVerify);


module.exports = router;