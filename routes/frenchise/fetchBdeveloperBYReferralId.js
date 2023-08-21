const express = require("express");
const { getBusinessDeveloperByReferrralId } = require("../../controllers/frenchiseController");
const router = express.Router();
router.get("/getAll-BdeveloperBY-referalId",getBusinessDeveloperByReferrralId);

module.exports = router