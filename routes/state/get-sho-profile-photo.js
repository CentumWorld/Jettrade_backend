const express = require("express");
const router = express.Router();

const { getSHOProfilePhoto } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-sho-profile-photo',authenticateAdmin,authorizeRole(["state", ]),getSHOProfilePhoto);
module.exports = router;
