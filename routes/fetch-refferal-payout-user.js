const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-refferal-payout-user',checkMiddleware.checkAuth, adminController.fetchRefferalPayoutUser);


module.exports = router;