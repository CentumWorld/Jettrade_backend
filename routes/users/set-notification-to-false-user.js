const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/set-notification-to-false-user',checkMiddleware.checkAuth, userController.setNotificationToFalseUser);


module.exports = router;