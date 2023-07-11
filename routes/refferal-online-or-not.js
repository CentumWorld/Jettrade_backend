const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/refferal-online-or-not',checkMiddleware.checkAuth, adminController.refferalOnlineOrNot);


module.exports = router;