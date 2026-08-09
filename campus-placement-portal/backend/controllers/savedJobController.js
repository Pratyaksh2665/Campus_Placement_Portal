const SavedJob = require("../models/SavedJob");
const Job = require("../models/Job");

const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadySaved = await SavedJob.findOne({
      student: req.user.id,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(409).json({
        success: false,
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      student: req.user.id,
      job: jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      student: req.user.id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name logo location",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const savedJob = await SavedJob.findOneAndDelete({
      student: req.user.id,
      job: jobId,
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job removed from saved jobs",
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
  saveJob,
  getSavedJobs,
  removeSavedJob,
};
