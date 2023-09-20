const express = require("express");
const router = express.Router()

const { frenchiseVerifyLoginOtp} = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/frenchise-verify-login-otp',frenchiseVerifyLoginOtp);
module.exports = router;
