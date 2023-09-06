const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-frenchise-chat-message-admin',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.fethcFrenchiseChatMessageAdmin);


module.exports = router;