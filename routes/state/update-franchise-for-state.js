const express = require("express");
const router = express.Router()
const {   updateFranchiseForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");


router.put('/update-franchise-for-state/:id',authenticateAdmin,authorizeRole(["admin", "subAdmin", "state"]),updateFranchiseForState);
module.exports = router;
