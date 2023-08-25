const express = require('express');
const router = express.Router();
require('dotenv').config();

const {updateOwnSubAdminDetails} = require('../../controllers/subAdminController');
const {authenticateAdmin, authorizeRole } = require('../../middleware/checkAuth');

router.put('/update-own-sub-admin-details',authenticateAdmin,authorizeRole(["subAdmin"]),updateOwnSubAdminDetails);


module.exports = router;