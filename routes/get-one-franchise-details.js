const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/get-one-franchise-details',authenticateAdmin,authorizeRole(["admin", "state"]), adminController.getOneFranchiseDetails);


module.exports = router;