const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/block-business-developer-by-admin',authenticateAdmin,authorizeRole(["admin"]),adminController.blockBusinessDeveloperByAdmin);


module.exports = router;