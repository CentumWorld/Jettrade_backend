const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/verify-member',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.verifyMember);


module.exports = router;