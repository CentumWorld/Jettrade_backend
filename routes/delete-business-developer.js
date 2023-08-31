const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/delete-business-developer',authenticateAdmin,authorizeRole(["admin", "state", "businessDeveloper"]), adminController.deleteBusinessDeveloper);


module.exports = router;