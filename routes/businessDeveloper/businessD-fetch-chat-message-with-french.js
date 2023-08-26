const express = require("express");
const router = express.Router()


const { businessDFetchChatMessageWithFrench} = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/businessDeveloper/businessD-fetch-chat-message-with-french',authenticateAdmin,authorizeRole(["businessDeveloper"]),businessDFetchChatMessageWithFrench);
module.exports = router;
