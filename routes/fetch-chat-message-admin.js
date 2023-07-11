const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/fetch-chat-message-admin',checkMiddleware.checkAuth, adminController.fetchChatMessageAdmin);


module.exports = router;