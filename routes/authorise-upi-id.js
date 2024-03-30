const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/authorise-upi-id',authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.authoriseUpiId);


module.exports = router;