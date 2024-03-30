const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/authorise-bank',authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.authoriseBank);


module.exports = router;