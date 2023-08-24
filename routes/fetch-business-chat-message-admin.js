const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-business-chat-message-admin',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchBusinessChatMessageAdmin);


module.exports = router;