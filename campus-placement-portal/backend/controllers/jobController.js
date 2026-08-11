const Company = require("../models/Company");
const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      company,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      experienceLevel === undefined ||
      !location ||
      !jobType ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    if (existingCompany.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create jobs for this company",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      company,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { keyword = "", location, jobType } = req.query;

    let query = {};

    // Search by title, description, requirements OR company name
    if (keyword.trim()) {
      const companies = await Company.find({
        name: {
          $regex: keyword.trim(),
          $options: "i",
        },
      }).select("_id");

      const companyIds = companies.map((company) => company._id);

      query.$or = [
        {
          title: {
            $regex: keyword.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword.trim(),
            $options: "i",
          },
        },
        {
          requirements: {
            $regex: keyword.trim(),
            $options: "i",
          },
        },
        {
          company: {
            $in: companyIds,
          },
        },
      ];
    }

    // Location filter
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Job type filter
    if (jobType) {
      query.jobType = jobType;
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
    console.error("Get All Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "company",
      "name logo location description website",
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job",
      });
    }

    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      company,
    } = req.body;
    if (company) {
      const existingCompany = await Company.findById(company);

      if (!existingCompany) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }

      if (existingCompany.createdBy.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to use this company",
        });
      }
    }
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        requirements,
        salary,
        experienceLevel,
        location,
        jobType,
        position,
        company,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("company", "name logo location");

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({
      createdBy: recruiterId,
    })
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
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getRecruiterJobs,
};
