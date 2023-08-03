const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/refferal-my-team",
  authenticateMember,
  authorizeMember,
  memberController.refferalMyTeam
);

module.exports = router;
