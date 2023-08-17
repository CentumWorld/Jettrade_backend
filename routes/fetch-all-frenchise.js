const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.get("/fetch-all-frenchise",authenticateAdmin,authorizeAdmin,adminController.findAllFrenchise)
module.exports = router;



