const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/admin-fetch-member-refferal-payout-request',authenticateAdmin,authorizeAdmin, adminController.adminFetchMemberRefferalPayoutRequest);


module.exports = router;