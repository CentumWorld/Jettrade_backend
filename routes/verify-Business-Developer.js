const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/verify-business-developer',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.verifyBusinessDeveloper);


module.exports = router;