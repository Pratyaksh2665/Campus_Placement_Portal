const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

// Create Company
router.post(
  "/create",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  createCompany,
);

// Get All Companies
router.get(
  "/",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  getCompanies,
);

// Get Company By Id
router.get(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  getCompanyById,
);

// Update Company
router.put(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  updateCompany,
);

// Delete Company
router.delete(
  "/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles("recruiter"),
  deleteCompany,
);

module.exports = router;
