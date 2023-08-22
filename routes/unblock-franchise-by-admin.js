const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/unblock-franchise-by-admin',authenticateAdmin,authorizeRole(["admin"]),adminController.unblockFranchiseByAdmin);


module.exports = router;