const express = require("express");
const router = express.Router()
const { getOwnBusinessDeveloperDetails } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/get-own-business-developer-details',authenticateAdmin,authorizeRole(["businessDeveloper"]),getOwnBusinessDeveloperDetails);
module.exports = router;
