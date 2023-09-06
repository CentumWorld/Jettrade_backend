const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');
router.post('/user-online-or-not',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.UserOnlineOrNot);


module.exports = router;