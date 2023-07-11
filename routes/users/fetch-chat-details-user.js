const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-chat-details-user',checkMiddleware.checkAuth, userController.fetchChatDetailsUser);


module.exports = router;