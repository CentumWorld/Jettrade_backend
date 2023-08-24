
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharcardFranchise } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-franchise',
  upload.fields([{ name: 'adharCard' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state"]),
  updateAdharcardFranchise
);

module.exports = router;
