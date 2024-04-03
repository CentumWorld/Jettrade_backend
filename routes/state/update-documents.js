const express = require("express");
const router = express.Router();
const upload = require("../../utils/aws");
const { updateDocuments } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.patch(
  "/upload-documents/:userId",
  upload.fields([{  name: 'adhar_front_side' }, { name: 'adhar_back_side' },{name:'panCard'}]),
  authenticateAdmin,
  authorizeRole(["state", "franchise", "user", "member"]),
  updateDocuments
);

module.exports = router;

