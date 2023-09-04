const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-all-new-paid-user',authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.fetchAllNewPaidUser);


module.exports = router;