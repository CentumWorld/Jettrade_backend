const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/delete-state',authenticateAdmin,authorizeRole(["admin"]), adminController.deleteState);


module.exports = router;