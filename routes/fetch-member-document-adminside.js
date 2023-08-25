const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-member-document-adminside',authenticateAdmin,authorizeRole(["admin", "state", "franchise", "businessDeveloper"]),adminController.fetchMemberDocumentAdminside);


module.exports = router;