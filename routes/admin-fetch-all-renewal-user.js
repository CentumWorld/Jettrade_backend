const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-all-renewal-user',authenticateAdmin,authorizeRole(["admin"]),adminController.adminFetchAllRenewalUser);


module.exports = router;