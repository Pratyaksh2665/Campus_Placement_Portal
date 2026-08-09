const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getAllJobs);

router.get(
  "/recruiter",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  getRecruiterJobs,
);

router.get("/:id", getJobById);

router.post(
  "/create",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  createJob,
);

router.put(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  updateJob,
);

router.delete(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  deleteJob,
);

module.exports = router;
