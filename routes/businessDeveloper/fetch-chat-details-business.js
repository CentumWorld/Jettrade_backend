const express = require("express");
const router = express.Router()


const { fetchChatDetailsBusiness} = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/businessDeveloper/fetch-chat-details-business',authenticateAdmin,authorizeRole(["businessDeveloper"]),fetchChatDetailsBusiness);
module.exports = router;
