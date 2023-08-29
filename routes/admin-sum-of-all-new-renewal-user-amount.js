const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/admin-sum-of-all-new-renewal-user-amount',authenticateAdmin,authorizeRole(["admin"]), adminController.adminSumOfAllNewRenewalUserAmount);


module.exports = router;