const express = require('express');
const router = express.Router();
require('dotenv').config();

const {getOwnSubAdminDetails} = require('../../controllers/subAdminController');
const {authenticateAdmin, authorizeRole } = require('../../middleware/checkAuth');

router.get('/get-own-sub-admin-details',authenticateAdmin,authorizeRole(["subAdmin"]),getOwnSubAdminDetails);


module.exports = router;