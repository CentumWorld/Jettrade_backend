const express = require("express");
const router = express.Router()

const { fetchBusinessChatCountWithFrenchise} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/fetch-business-chat-count-with-frenchise',authenticateAdmin,authorizeRole(["franchise"]),fetchBusinessChatCountWithFrenchise);
module.exports = router;
