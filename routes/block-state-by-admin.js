const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/block-state-by-admin/:id',authenticateAdmin,authorizeRole(["admin"]),adminController.blockStateByAdmin);


module.exports = router;