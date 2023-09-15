const express = require("express");
const router = express.Router()
const { getBDProfilePhoto } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-bd-profile-photo',authenticateAdmin,authorizeRole([ "businessDeveloper"]),getBDProfilePhoto);
module.exports = router;
