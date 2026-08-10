const express = require("express");

const upload = require("../middleware/upload");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", checkForAuthenticationCookie("token"), getProfile);

router.put("/", checkForAuthenticationCookie("token"), updateProfile);

router.post(
  "/upload-resume",
  checkForAuthenticationCookie("token"),
  upload.single("resume"),
  uploadResume,
);

module.exports = router;
