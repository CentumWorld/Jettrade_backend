const express = require("express");
const router = express.Router()
const {    getFranchiseForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");


router.get('/get-franchise-for-state/:id',authenticateAdmin,authorizeRole(["admin", "state"]),getFranchiseForState);
module.exports = router;
