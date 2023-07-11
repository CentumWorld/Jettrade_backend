const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/admin-fetch-member-refferal-payout-request',checkMiddleware.checkAuth, adminController.adminFetchMemberRefferalPayoutRequest);


module.exports = router;