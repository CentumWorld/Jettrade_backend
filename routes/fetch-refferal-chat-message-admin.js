const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/fetch-refferal-chat-message-admin',authenticateAdmin,authorizeAdmin, adminController.fetchRefferalChatMessageAdmin);


module.exports = router;