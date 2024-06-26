const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');
router.put('/user-lock-and-unlock',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.userLockAndUnlock);


module.exports = router;