const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/user-online-or-not',authenticateAdmin,authorizeAdmin, adminController.UserOnlineOrNot);


module.exports = router;