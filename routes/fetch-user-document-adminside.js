const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/fetch-user-document-adminside',checkMiddleware.checkAuth, adminController.fetchUserDocumentAdmin);


module.exports = router;