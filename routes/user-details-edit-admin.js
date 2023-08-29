const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');
router.post('/user-details-edit-admin',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.userDetailsEditAdmin);


module.exports = router;