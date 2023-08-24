const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-state-chat-count',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchStateChatCount);


module.exports = router;