const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/fetch-chat-message-admin',authenticateAdmin,authorizeAdmin, adminController.fetchChatMessageAdmin);


module.exports = router;