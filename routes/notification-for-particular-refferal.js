const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/notification-for-particular-refferal',authenticateAdmin,authorizeRole(["admin"]), adminController.notificationForParticularRefferal);


module.exports = router;