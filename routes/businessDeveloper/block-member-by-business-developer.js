const express = require("express");
const router = express.Router()
const { blockMemberByBusinessDeveloper } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/block-member-by-business-developer/:id',authenticateAdmin,authorizeRole(["admin", "businessDeveloper"]),blockMemberByBusinessDeveloper);
module.exports = router;
