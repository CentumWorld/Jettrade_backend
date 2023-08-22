const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/unblock-state-by-admin',authenticateAdmin,authorizeRole(["admin"]),adminController.unblockStateByAdmin);


module.exports = router;