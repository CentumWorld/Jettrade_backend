const express = require("express");
const router = express.Router()
const {  blockFranchiseForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/block-franchise-for-state/:id',authenticateAdmin,authorizeRole(["admin", "state"]),blockFranchiseForState);
module.exports = router;
