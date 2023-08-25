const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-all-sub-admin-details',authenticateAdmin,authorizeRole(["admin"]),adminController.fetchAllSubAdminDetails);


module.exports = router;