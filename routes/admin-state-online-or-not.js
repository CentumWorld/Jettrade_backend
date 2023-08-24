const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/admin-state-online-or-not',authenticateAdmin,authorizeRole(["admin"]), adminController.stateOnlineOrNot);


module.exports = router;