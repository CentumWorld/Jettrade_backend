const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/fetch-particular-user-details-from-admin-using-userid',authenticateAdmin,authorizeAdmin,adminController.fetchParticularUserDetailsFromAdminUsingUserid);


module.exports = router;