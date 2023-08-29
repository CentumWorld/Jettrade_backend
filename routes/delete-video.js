const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');
router.delete('/delete-video/:id', authenticateAdmin, authorizeRole(["admin"]), adminController.deleteVideo);
module.exports = router;