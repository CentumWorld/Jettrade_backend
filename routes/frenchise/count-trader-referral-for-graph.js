const express = require("express");
const router = express.Router()

const { countTraderReferralForGraph } = require("../../controllers/franchiseController");

const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");

router.post('/count-trader-referral-for-graph',authenticateAdmin,authorizeRole(["franchise"]),countTraderReferralForGraph);
module.exports = router;
