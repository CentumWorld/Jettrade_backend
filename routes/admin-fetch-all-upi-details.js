const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/admin-fetch-all-upi-details',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.adminFetchAllUpiDetails);


module.exports = router;