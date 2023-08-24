const express = require("express");
const router = express.Router()
const { adminOnlineOrNot } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/state/admin-online-or-not',authenticateAdmin,authorizeRole(["state"]),adminOnlineOrNot);
module.exports = router;
