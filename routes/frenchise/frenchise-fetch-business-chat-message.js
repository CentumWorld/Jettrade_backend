const express = require("express");
const router = express.Router()

const { frenchiseFetchBusinessChatMessage} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/frenchise-fetch-business-chat-message',authenticateAdmin,authorizeRole(["franchise"]),frenchiseFetchBusinessChatMessage);
module.exports = router;
