const express = require("express");
const router = express.Router()

const { adminOnlineOrNotFrench } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/frenchise/admin-online-or-not-french',authenticateAdmin,authorizeRole(["franchise"]),adminOnlineOrNotFrench);
module.exports = router;
