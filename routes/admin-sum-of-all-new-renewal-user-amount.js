const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/admin-sum-of-all-new-renewal-user-amount',authenticateAdmin,authorizeAdmin, adminController.adminSumOfAllNewRenewalUserAmount);


module.exports = router;