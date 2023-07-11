const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/fetch-refferal-chat-message-admin',checkMiddleware.checkAuth, adminController.fetchRefferalChatMessageAdmin);


module.exports = router;