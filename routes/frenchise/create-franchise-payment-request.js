const express = require("express");
const router = express.Router()

const { createFranchisePaymentRequest } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/create-franchise-payment-request',authenticateAdmin,authorizeRole(["franchise"]),createFranchisePaymentRequest);
module.exports = router;
