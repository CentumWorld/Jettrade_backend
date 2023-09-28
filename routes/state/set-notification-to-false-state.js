const express = require("express");
const router = express.Router();

const {  setNotificationToFalse } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/set-notification-to-false-state',authenticateAdmin,authorizeRole(["state"]),setNotificationToFalse);
module.exports = router;
