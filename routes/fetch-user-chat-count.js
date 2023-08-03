const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-user-chat-count',authenticateAdmin,authorizeAdmin, adminController.fetchUserChatCount);


module.exports = router;