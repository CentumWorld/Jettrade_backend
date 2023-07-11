const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-refferal-payout-member',checkMiddleware.checkAuth, adminController.fetchRefferalPayoutMember);


module.exports = router;