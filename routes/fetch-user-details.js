const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeAdminandSubAdmin} = require('../middleware/checkAuth');

router.get('/fetch-user-details',authenticateAdmin,authorizeAdminandSubAdmin, adminController.fetchUserDetails);


module.exports = router;