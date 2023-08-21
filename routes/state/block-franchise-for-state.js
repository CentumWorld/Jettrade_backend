const express = require("express");
const router = express.Router()
const {  blockFranchiseForState } = require("../../controllers/stateController");
const { authenticateState, authorizeState } = require("../../middleware/checkAuth");
router.get('/block-franchise-for-state/:id',authenticateState,authorizeState,blockFranchiseForState);
module.exports = router;
