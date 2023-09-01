const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-particular-business-developer-details',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchParticularBusinessDeveloperDetails);


module.exports = router;