const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/notification-for-all',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.notificationForAll);


module.exports = router;