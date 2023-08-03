const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/fetch-user-document-adminside',authenticateAdmin,authorizeAdmin, adminController.fetchUserDocumentAdmin);


module.exports = router;