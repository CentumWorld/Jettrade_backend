const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/block-franchise-by-admin/:id',authenticateAdmin,authorizeRole(["admin"]),adminController.blockFranchiseByAdmin);


module.exports = router;