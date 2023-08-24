const express = require("express");
const router = express.Router()

const {  fetchChatWithSHOMessage } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/fetch-chat-with-SHO-message',authenticateAdmin,authorizeRole(["franchise"]),fetchChatWithSHOMessage);
module.exports = router;
