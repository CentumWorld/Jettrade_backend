const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/notification-for-particular-refferal',authenticateAdmin,authorizeAdmin, adminController.notificationForParticularRefferal);


module.exports = router;