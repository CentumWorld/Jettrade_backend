const express = require("express");
const router = express.Router()

const {  fetchChatMessageBusiness } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/businessDeveloper/fetch-chat-message-business',authenticateAdmin,authorizeRole(["businessDeveloper"]),fetchChatMessageBusiness);
module.exports = router;
