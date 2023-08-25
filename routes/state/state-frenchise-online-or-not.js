const express = require("express");
const router = express.Router();

const {  stateFrenchiseOnlineOrNot } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/state-frenchise-online-or-not',authenticateAdmin,authorizeRole(["state"]),stateFrenchiseOnlineOrNot);
module.exports = router;
