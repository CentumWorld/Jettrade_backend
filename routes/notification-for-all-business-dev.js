const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
router.post('/notification-for-all-business-dev', authenticateAdmin, authorizeRole(["admin", "subAdmin"]),
    adminController.notificationForAllBusinessDev);


module.exports = router;