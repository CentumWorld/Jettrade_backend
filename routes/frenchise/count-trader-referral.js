const express = require("express");
const router = express.Router()

const { countTraderReferral } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/count-trader-referral',authenticateAdmin,authorizeRole(["franchise"]),countTraderReferral);
module.exports = router;
