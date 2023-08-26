const express = require("express");
const router = express.Router()

const {  frenchiseOnlineOrNotForBusiness } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/businessDeveloper/Frenchise-online-or-not-for-businessD',authenticateAdmin,authorizeRole(["businessDeveloper"]),frenchiseOnlineOrNotForBusiness);
module.exports = router;
