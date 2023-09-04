const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-user-document-adminside',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.fetchUserDocumentAdmin);

module.exports = router;