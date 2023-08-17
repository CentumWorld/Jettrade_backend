const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/fetch-all-sub-admin-details',authenticateAdmin,authorizeAdmin,adminController.fetchAllSubAdminDetails);


module.exports = router;