const express = require("express");
const router = express.Router()
const { adminOnlineOrNotBusiness } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/businessDeveloper/admin-online-or-not-business',authenticateAdmin,authorizeRole(["admin", "businessDeveloper"]),adminOnlineOrNotBusiness);
module.exports = router;
