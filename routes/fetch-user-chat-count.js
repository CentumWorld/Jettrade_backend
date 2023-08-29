const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-user-chat-count',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchUserChatCount);


module.exports = router;