const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin , authorizeRole} = require('../middleware/checkAuth');
router.post('/member-details-edit-admin',authenticateAdmin,authorizeRole(["admin", "state", "subAdmin", "franchise", "businessDeveloper"]),adminController.memberDetailsEditAdmin);


module.exports = router;