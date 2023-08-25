const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');
router.post('/manage-subadmin',authenticateAdmin,authorizeRole(["admin"]), adminController.manageSubAdminRole);


module.exports = router;