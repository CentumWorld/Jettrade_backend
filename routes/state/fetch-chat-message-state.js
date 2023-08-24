const express = require("express");
const router = express.Router()
const {  fetchChatMessageState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/fetch-chat-message-state',authenticateAdmin,authorizeRole(["state"]),fetchChatMessageState);
module.exports = router;
