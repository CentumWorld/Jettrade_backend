const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/notification-for-all-traders',authenticateAdmin,authorizeRole(["admin"]),adminController.notificationForAllTraders);


module.exports = router;