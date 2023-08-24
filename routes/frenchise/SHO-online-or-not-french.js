const express = require("express");
const router = express.Router()

const {  SHOonlineOrNotFrench } = require("../../controllers/franchiseController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/frenchise/SHO-online-or-not-french',authenticateAdmin,authorizeRole(["franchise"]),SHOonlineOrNotFrench);
module.exports = router;
