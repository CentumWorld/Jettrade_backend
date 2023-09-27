const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
router.post('/notification-for-all-franchise', authenticateAdmin, authorizeRole(["admin", "subAdmin"]),
    adminController.notificationForAllFranchise);


module.exports = router;