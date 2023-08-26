const express = require("express");
const router = express.Router()

const { frenchiseBusinessOnlineOrNot} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/frenchise-business-online-or-not',authenticateAdmin,authorizeRole(["franchise"]),frenchiseBusinessOnlineOrNot);
module.exports = router;
