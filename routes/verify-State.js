const express = require('express');
const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/verify-state',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.verifyState);


module.exports = router;