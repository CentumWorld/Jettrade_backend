const express = require("express");
const router = express.Router()
const { getOneMemberByIdByBusinessDeveloper } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/get-one-member-by-id-by-business-developer/:id',authenticateAdmin,authorizeRole(["admin", "businessDeveloper"]),getOneMemberByIdByBusinessDeveloper);
module.exports = router;
