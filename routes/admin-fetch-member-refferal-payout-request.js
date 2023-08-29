const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/admin-fetch-member-refferal-payout-request',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchMemberRefferalPayoutRequest);


module.exports = router;