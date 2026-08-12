const express = require("express");

const router = express.Router();

const { getJobMatch } = require("../controllers/aiController");

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

module.exports = router;
