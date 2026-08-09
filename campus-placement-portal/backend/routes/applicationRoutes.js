const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
} = require("../controllers/applicationController");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

// Student
router.post(
  "/apply",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  applyJob,
);

router.get(
  "/my",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  getMyApplications,
);

// Recruiter
router.get(
  "/job/:jobId",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  getApplicants,
);

router.put(
  "/:id/status",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  updateStatus,
);

module.exports = router;
