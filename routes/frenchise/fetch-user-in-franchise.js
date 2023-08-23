const express = require("express");
const router = express.Router();
const { getUsersInFranchise } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-all-users-in-franchise",authenticateAdmin,
authorizeRole(["admin", "franchise"])
,getUsersInFranchise);

module.exports = router