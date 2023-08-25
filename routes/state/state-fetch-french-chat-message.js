const express = require("express");
const router = express.Router();

const {  stateFetchFrenchChatMessage } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/state-fetch-french-chat-message',authenticateAdmin,authorizeRole(["state"]),stateFetchFrenchChatMessage);
module.exports = router;
