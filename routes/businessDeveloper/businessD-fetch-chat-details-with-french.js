const express = require("express");
const router = express.Router()


const { businessDFetchChatDetailsWithFrench} = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/businessDeveloper/businessD-fetch-chat-details-with-french',authenticateAdmin,authorizeRole(["businessDeveloper"]),businessDFetchChatDetailsWithFrench);
module.exports = router;
