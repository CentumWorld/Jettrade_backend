const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-particular-user-details',authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.fetchParticularUserDetails);


module.exports = router;