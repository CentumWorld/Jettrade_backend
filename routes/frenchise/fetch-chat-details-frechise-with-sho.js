const express = require("express");
const router = express.Router()

const { fetchChatDetailsFrenchiseWithSHO} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/fetch-chat-details-frechise-with-sho',authenticateAdmin,authorizeRole(["franchise"]),fetchChatDetailsFrenchiseWithSHO);
module.exports = router;
