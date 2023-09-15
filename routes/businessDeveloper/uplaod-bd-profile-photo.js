const express = require("express");
const router = express.Router();
const upload = require("../../utils/aws");
const { uploadBDProfilePhoto } = require("../../controllers/businessDevController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/upload-bd-profile-photo",
  upload.fields([{ name: "profilePhoto", maxCount: 1 }]),
  authenticateAdmin,
  authorizeRole(["businessDeveloper"]),
  uploadBDProfilePhoto
);

module.exports = router;
