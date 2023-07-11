const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/fetch-chat-message-refferal',checkMiddleware.checkAuth, memberController.fetchChatMessageRefferal);


module.exports = router;