const express = require("express")
const router = express.Router();
const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.get("/fetch-admin",authenticateAdmin,authorizeRole(["admin"]),adminController.fetchAdmin)
module.exports = router;



