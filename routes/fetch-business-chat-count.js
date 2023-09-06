const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-business-chat-count',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.fetchBusinessChatCount);


module.exports = router;