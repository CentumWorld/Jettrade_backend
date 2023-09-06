const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin,authorizeRole} = require('../middleware/checkAuth');
router.post('/admin-frenchise-online-or-not',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.adminFrenchiseOnlineOrNot);


module.exports = router;