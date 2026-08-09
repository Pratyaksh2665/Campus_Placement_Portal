const express = require("express");
const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  saveJob,
);

router.get(
  "/",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  getSavedJobs,
);

router.delete(
  "/:jobId",
  checkForAuthenticationCookie("token"),
  authorizeRoles("student"),
  removeSavedJob,
);

module.exports = router;
