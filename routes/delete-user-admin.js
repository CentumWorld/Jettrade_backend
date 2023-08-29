const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/delete-user-admin',authenticateAdmin,authorizeRole(["admin"]), adminController.deleteUserAdmin);


module.exports = router;