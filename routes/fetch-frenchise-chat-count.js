const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-frenchise-chat-count',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.fetchFrenchiseChatCount);


module.exports = router;