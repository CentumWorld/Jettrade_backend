const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/fetch-refferal-notification",
  authenticateMember,
  authorizeMember,
  memberController.fetchRefferalNotification
);

module.exports = router;
