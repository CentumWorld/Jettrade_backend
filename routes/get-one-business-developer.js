const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/get-one-business-developer-details',authenticateAdmin,authorizeRole(["admin", "state", "franchise","subAdmin"]), adminController.getOneBDDetails);


module.exports = router;