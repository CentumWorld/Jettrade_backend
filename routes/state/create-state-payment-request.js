const express = require("express");
const router = express.Router()
const {  createStatePaymentRequest } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/create-state-payment-request',authenticateAdmin,authorizeRole([ "state"]),createStatePaymentRequest);
module.exports = router;
