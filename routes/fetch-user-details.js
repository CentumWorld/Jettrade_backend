const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-user-details', adminController.fetchUserDetails);


module.exports = router;