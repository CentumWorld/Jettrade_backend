const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-member-details',authenticateAdmin,authorizeRole(["admin", "subAdmin", "state", "franchise", "businessDeveloper"]), adminController.fetchMemberDetails);


module.exports = router;