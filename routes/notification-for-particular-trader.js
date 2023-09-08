const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/notification-for-particular-trader',authenticateAdmin,authorizeRole(["admin","subAdmin"]),adminController.notificationForParticularTrader);


module.exports = router;