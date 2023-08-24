const express = require("express");
const router = express.Router()
const { fetchChatDetailsFrenchisee} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/fetch-chat-details-frenchisee',authenticateAdmin,authorizeRole(["franchise"]),fetchChatDetailsFrenchisee);
module.exports = router;
