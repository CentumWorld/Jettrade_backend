const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/delete-franchise',authenticateAdmin,authorizeRole(["admin", "state"]), adminController.deleteFranchise);


module.exports = router;