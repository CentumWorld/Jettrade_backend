const express = require("express");
const router = express.Router()

const {  eligibleFranchiseForWithdrawal } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/eligible-franchise-for-withdrawal',authenticateAdmin,authorizeRole(["franchise"]),eligibleFranchiseForWithdrawal);
module.exports = router;
