const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/verify-user',authenticateAdmin,authorizeRole(["admin", 
"subAdmin"]), adminController.verifyUser);


module.exports = router;