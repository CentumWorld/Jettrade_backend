const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/unblock-business-developer-by-admin/:id',authenticateAdmin,authorizeRole(["admin"]),adminController.unblockBusinessDeveloperByAdmin);


module.exports = router;