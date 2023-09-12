const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/verify-franchise',authenticateAdmin,authorizeRole(["admin","subAdmin","state"]), adminController.verifyFranchise);


module.exports = router;