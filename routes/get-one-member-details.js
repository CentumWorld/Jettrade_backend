const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/get-one-member-details',authenticateAdmin,authorizeRole(["admin", "state", "franchise", "businessDeveloper"]), adminController.getOneMemberDetails);


module.exports = router;