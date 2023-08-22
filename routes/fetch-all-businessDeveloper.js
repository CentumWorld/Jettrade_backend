const express = require("express")
const router = express.Router();
const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.get("/fetch-all-businessDeveloper",authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.findAllBusinessDeveloper)
module.exports = router;



