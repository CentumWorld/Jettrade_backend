const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-refferal-chat-count',checkMiddleware.checkAuth, adminController.fetchRefferalChatCount);


module.exports = router;