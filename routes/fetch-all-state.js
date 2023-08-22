const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.get("/fetch-all-state",authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.findAllState)
module.exports = router;

