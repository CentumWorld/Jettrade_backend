const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-chat-message-user',checkMiddleware.checkAuth, userController.fetchChatMessageUser);


module.exports = router;