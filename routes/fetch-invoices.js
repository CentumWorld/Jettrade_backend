const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-invoices',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.fetchInvoices);


module.exports = router;