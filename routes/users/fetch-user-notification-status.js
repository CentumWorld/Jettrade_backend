const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-user-notification-status',checkMiddleware.checkAuth, userController.fetchUserNotificationStatus);


module.exports = router;