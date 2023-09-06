const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-refferal-chat-count',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.fetchRefferalChatCount);


module.exports = router;