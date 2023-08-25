const express = require("express");
const router = express.Router();

const {  fetchFrenchiseChatCountWithState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/fetch-frenchise-chat-count-with-state',authenticateAdmin,authorizeRole(["state"]),fetchFrenchiseChatCountWithState);
module.exports = router;
