const express = require("express");
const router = express.Router()
const {    getFranchiseForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");


router.get('/get-franchise-for-state/:id',authenticateAdmin,authorizeRole(["admin", "subAdmin", "state"]),getFranchiseForState);
module.exports = router;
