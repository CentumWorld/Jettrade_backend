const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-user-notification',checkMiddleware.checkAuth, userController.fetchUserNotification);


module.exports = router;