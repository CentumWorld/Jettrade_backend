const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.get("/fetch-all-frenchise",authenticateAdmin,authorizeRole(["admin"]),adminController.findAllFrenchise)
module.exports = router;



