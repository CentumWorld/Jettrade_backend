const express = require("express");
const router = express.Router()

const { createFranchiseBankAccountHolder } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/create-franchise-bank-account-holder',authenticateAdmin,authorizeRole(["franchise"]),createFranchiseBankAccountHolder);
module.exports = router;
