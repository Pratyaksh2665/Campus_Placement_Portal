const express = require("express");
const upload = require("../middleware/upload");
const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/profileController");

router.get("/", checkForAuthenticationCookie("token"), getProfile);

router.put("/", checkForAuthenticationCookie("token"), updateProfile);

router.put(
  "/upload-resume",
  checkForAuthenticationCookie("token"),
  upload.single("resume"),
  uploadResume,
);

module.exports = router;
