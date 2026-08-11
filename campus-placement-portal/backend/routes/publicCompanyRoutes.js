const express = require("express");

const router = express.Router();

const {
  getAllCompanies,
  getPublicCompanyById,
} = require("../controllers/publicCompanyController");

router.get("/", getAllCompanies);

router.get("/:id", getPublicCompanyById);

module.exports = router;
