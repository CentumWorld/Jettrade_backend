const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-particular-franchise-details',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchParticularFranchiseDetails);


module.exports = router;