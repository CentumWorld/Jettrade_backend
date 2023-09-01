const express = require("express");
const router = express.Router();

const {  getStateOwnUpi } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-state-own-upi',authenticateAdmin,authorizeRole(["state", "admin"]),getStateOwnUpi);
module.exports = router;
