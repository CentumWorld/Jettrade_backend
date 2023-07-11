const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/notification-for-all',checkMiddleware.checkAuth, adminController.notificationForAll);


module.exports = router;