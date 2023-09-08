const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,authorizeRole} = require('../middleware/checkAuth');
router.post('/notification-for-all-refferal',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.notificationForAllRefferal);


module.exports = router;