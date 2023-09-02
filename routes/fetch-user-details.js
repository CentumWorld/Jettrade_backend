const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-user-details',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.fetchUserDetails);


module.exports = router;