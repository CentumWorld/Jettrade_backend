const express = require("express");
const router = express.Router()

const { createFranchiseUpiHolder } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/create-franchise-upi-holder',authenticateAdmin,authorizeRole(["franchise"]),createFranchiseUpiHolder);
module.exports = router;
