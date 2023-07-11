const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/block-member',checkMiddleware.checkAuth, adminController.blockMember);


module.exports = router;