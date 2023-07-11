const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/member-details-edit-admin',checkMiddleware.checkAuth, adminController.memberDetailsEditAdmin);


module.exports = router;