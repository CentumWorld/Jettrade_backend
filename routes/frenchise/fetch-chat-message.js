const express = require("express");
const router = express.Router()

const {  fetchChatMessage } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/fetch-chat-message',authenticateAdmin,authorizeRole(["franchise"]),fetchChatMessage);
module.exports = router;
