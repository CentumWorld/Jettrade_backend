const express = require("express");
const router = express.Router()
const {    getFranchiseForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");


router.post('/get-franchise-for-state',authenticateAdmin,authorizeRole(["admin", "state"]),getFranchiseForState);
module.exports = router;
