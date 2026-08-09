const express = require("express");
const router = express.Router();

const { searchJobs } = require("../controllers/searchJobsController");

router.get("/", searchJobs);

module.exports = router;
