const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeAdmin, authorizeRole } = require('../middleware/checkAuth');
router.post('/notification-for-particular-sho', authenticateAdmin, authorizeRole(["admin", "subAdmin"]),
    adminController.notificationForParticularSho);


module.exports = router;