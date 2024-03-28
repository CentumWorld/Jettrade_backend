const express = require("express");
const router = express.Router();

const {  stateUpdateUpiDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/state-update-upi-details',authenticateAdmin,authorizeRole(["state"]),stateUpdateUpiDetails);
module.exports = router;
