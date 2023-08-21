const express = require("express");

const { deleteFranchiseForState } = require("../../controllers/stateController");
const {authenticateAdmin,authorizeRole}= require("../../middleware/checkAuth")
const router = express.Router();
router.delete("/delete-franchise-for-state/:id",authenticateAdmin,authorizeRole(["admin", "state"]),deleteFranchiseForState);

module.exports = router