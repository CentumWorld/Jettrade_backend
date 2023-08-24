const express = require("express");
const router = express.Router()
const {  fetchChatDetailsState} = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/fetch-chat-details-state',authenticateAdmin,authorizeRole(["state"]),fetchChatDetailsState);
module.exports = router;
