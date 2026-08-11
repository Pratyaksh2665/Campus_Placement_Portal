const express = require("express");
const router = express.Router();

const { getAllCompanies } = require("../controllers/companyController");

router.get("/", getAllCompanies);

module.exports = router;
