const express = require("express");

const { deleteFranchiseForState } = require("../../controllers/stateController");
const router = express.Router();
router.delete("/delete-franchise-for-state/:id",deleteFranchiseForState);

module.exports = router