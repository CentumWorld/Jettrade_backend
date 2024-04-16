const express = require("express");
const router = express.Router()
const {  fetchBmmNote } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/fetch-bmm-note',authenticateAdmin,authorizeRole([ "state"]),fetchBmmNote);
module.exports = router;
