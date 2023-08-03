const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-member-document-member-side",
  authenticateMember,
  authorizeMember,
  memberController.fetchMemberDocumentMemberSide
);

module.exports = router;
