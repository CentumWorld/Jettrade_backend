const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");

router.post("/member-login", memberController.memberLogin);

module.exports = router;
