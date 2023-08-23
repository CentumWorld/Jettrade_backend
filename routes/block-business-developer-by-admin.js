const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/block-business-developer-by-admin',authenticateAdmin,authorizeRole(["admin", "state", "franchise"]),adminController.blockBusinessDeveloperByAdmin);


module.exports = router;