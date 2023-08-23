
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const { updateFranchise } = require('../controllers/adminController');

router.put(
  '/update-franchise',
  upload.fields([{ name: 'adharCard' }, { name: 'panCard'}]),
  authenticateAdmin,
  authorizeRole(["admin", "state"]),
  updateFranchise
);

module.exports = router;
