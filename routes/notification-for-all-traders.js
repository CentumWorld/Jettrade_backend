const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/notification-for-all-traders',checkMiddleware.checkAuth, adminController.notificationForAllTraders);


module.exports = router;