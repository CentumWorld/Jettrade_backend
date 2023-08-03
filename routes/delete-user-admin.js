const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/delete-user-admin',authenticateAdmin,authorizeAdmin, adminController.deleteUserAdmin);


module.exports = router;