const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/member-details-edit-admin',authenticateAdmin,authorizeAdmin,adminController.memberDetailsEditAdmin);


module.exports = router;