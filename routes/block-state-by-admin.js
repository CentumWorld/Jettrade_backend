const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/block-state-by-admin',authenticateAdmin,authorizeRole(["admin"]),adminController.blockStateByAdmin);


module.exports = router;