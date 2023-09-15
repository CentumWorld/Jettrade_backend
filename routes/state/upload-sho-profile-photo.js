const express = require("express");
const router = express.Router();
const upload = require("../../utils/aws");
const { uploadSHOProfilePhoto } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/upload-sho-profile-photo",
  upload.fields([{ name: "profilePhoto", maxCount: 1 }]),
  authenticateAdmin,
  authorizeRole(["state"]),
  uploadSHOProfilePhoto
);

module.exports = router;
