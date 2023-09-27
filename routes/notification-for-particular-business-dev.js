const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeAdmin, authorizeRole } = require('../middleware/checkAuth');
router.post('/notification-for-particular-business-dev', authenticateAdmin, authorizeRole(["admin", "subAdmin"]),
    adminController.notificationForParticularBusinessDev);


module.exports = router;