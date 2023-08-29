const express = require("express");
const router = express.Router()
const { getAllMembersInBusinessDeveloper } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-all-members-in-business-developer',authenticateAdmin,authorizeRole(["admin", "businessDeveloper"]),getAllMembersInBusinessDeveloper);
module.exports = router;