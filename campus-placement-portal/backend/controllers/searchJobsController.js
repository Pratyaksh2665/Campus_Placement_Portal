const Job = require("../models/Job");

const searchJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, experienceLevel, minSalary } =
      req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (experienceLevel) {
      query.experienceLevel = Number(experienceLevel);
    }

    if (minSalary) {
      query.salary = {
        $gte: Number(minSalary),
      };
    }

    const jobs = await Job.find(query)
      .populate("company", "name logo location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  searchJobs,
};
