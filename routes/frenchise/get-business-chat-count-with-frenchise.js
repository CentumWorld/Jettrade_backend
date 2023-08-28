const express = require("express");
const router = express.Router()

const { getBusinessChatCountWithFrenchise} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/get-business-chat-count-with-frenchise',authenticateAdmin,authorizeRole(["franchise"]),getBusinessChatCountWithFrenchise);
module.exports = router;
