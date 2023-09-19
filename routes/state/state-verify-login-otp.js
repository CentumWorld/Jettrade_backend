const express = require("express");
const router = express.Router();

const {  stateVerifyLoginOtp } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/state-verify-login-otp',stateVerifyLoginOtp);
module.exports = router;
