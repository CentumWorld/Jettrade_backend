const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin,  authorizeRole } = require('../middleware/checkAuth');

router.post(
  '/create-frenchise',
  upload.fields([{ name: 'adharCard', maxCount: 1 }, { name: 'panCard', maxCount: 1 }]),
  authenticateAdmin,
  authorizeRole(["admin", "state"]),
  adminController.createFrenchise
);

module.exports = router;
