const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/payment-userid-verify', userController.paymentUseridVerify);

router.get('/fetch-userid',checkMiddleware.checkAuth, userController.fetchUserid);



module.exports = router;