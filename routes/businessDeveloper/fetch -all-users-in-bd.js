const express = require("express");
const router = express.Router()
const { getAllUsersInBusinessDeveloper} = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-all-users-in-business-developer',authenticateAdmin,authorizeRole(["admin", "businessDeveloper"]),getAllUsersInBusinessDeveloper);
module.exports = router;
