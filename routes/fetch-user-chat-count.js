const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-user-chat-count',checkMiddleware.checkAuth, adminController.fetchUserChatCount);


module.exports = router;