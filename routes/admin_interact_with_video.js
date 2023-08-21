const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-interact-with-video',authenticateAdmin,authorizeRole(["admin", "subAdmin" , "state"]),adminController.interactWithVideoForAdmin);


module.exports = router;