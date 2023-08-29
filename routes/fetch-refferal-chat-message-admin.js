const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-refferal-chat-message-admin',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchRefferalChatMessageAdmin);


module.exports = router;