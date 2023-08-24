const express = require("express");
const router = express.Router()
const { updateOwnBusinessDeveloperDetails } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/update-own-business-developer-details',authenticateAdmin,authorizeRole(["businessDeveloper"]),updateOwnBusinessDeveloperDetails);
module.exports = router;
