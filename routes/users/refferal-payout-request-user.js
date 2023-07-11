const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/refferal-payout-request-user',checkMiddleware.checkAuth,userController.refferalPayoutRequestUser);

module.exports = router;