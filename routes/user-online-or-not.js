const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/user-online-or-not',checkMiddleware.checkAuth, adminController.UserOnlineOrNot);


module.exports = router;