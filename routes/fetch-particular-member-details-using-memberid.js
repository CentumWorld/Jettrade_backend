const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-particular-member-details-using-memberid',authenticateAdmin,authorizeRole(["admin"]), adminController.fetchParticularMemberDetailsUsingMemberid);


module.exports = router;