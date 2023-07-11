const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/block-user',checkMiddleware.checkAuth, adminController.blockUser);


module.exports = router;