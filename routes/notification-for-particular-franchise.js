const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeAdmin, authorizeRole } = require('../middleware/checkAuth');
router.post('/notification-for-particular-franchise', authenticateAdmin, authorizeRole(["admin", "subAdmin"]),
    adminController.notificationForParticularFranchise);


module.exports = router;