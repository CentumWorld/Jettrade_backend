const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/manage-subadmin',authenticateAdmin,authorizeAdmin, adminController.manageSubAdminRole);


module.exports = router;