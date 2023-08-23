const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/block-franchise-by-admin',authenticateAdmin,authorizeRole(["admin", "state"]),adminController.blockFranchiseByAdmin);


module.exports = router;