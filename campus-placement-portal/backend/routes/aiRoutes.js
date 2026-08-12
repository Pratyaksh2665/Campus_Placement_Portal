const express = require("express");

const router = express.Router();

const {
  getJobMatch,
  getApplicantJobMatch,
} = require("../controllers/aiController");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/job-match/:jobId",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  getJobMatch,
);

router.post(
  "/job-match/:jobId/applicant/:studentId",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  getApplicantJobMatch,
);

module.exports = router;
