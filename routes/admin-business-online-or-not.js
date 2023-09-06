const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,authorizeRole} = require('../middleware/checkAuth');
router.post('/admin-business-online-or-not',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.adminBusinessOnlineOrNot);


module.exports = router;