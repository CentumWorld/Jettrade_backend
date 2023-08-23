const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/block-member',authenticateAdmin,authorizeRole(["admin","subAdmin", "state", "franchise", "businessDeveloper"]), adminController.blockMember);


module.exports = router;