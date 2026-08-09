const express = require("express");
const router = express.Router();

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getStudentDashboard,
  getRecruiterDashboard,
} = require("../controllers/dashboardController");

router.get(
  "/student",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  getStudentDashboard,
);

router.get(
  "/recruiter",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  getRecruiterDashboard,
);

module.exports = router;
