const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/admin-sum-of-all-new-renewal-user-amount',checkMiddleware.checkAuth, adminController.adminSumOfAllNewRenewalUserAmount);


module.exports = router;