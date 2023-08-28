const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/block-user',authenticateAdmin,authorizeRole(["admin"]),adminController.blockUser);


module.exports = router; 