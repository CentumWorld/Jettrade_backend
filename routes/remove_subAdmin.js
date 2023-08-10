const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/remove-subadmin',authenticateAdmin,authorizeAdmin, adminController.removeSubAdmin);


module.exports = router;