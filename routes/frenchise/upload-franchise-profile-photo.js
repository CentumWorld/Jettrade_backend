const express = require("express");
const router = express.Router();
const upload = require("../../utils/aws");
const { uploadFranchiseProfilePhoto } = require("../../controllers/franchiseController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/upload-franchise-profile-photo",
  upload.fields([{ name: "profilePhoto", maxCount: 1 }]),
  authenticateAdmin,
  authorizeRole(["franchise"]),
  uploadFranchiseProfilePhoto
);

module.exports = router;
