const Application = require("../models/Application");
const Job = require("../models/Job");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      job: jobId,
      student: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      student: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
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
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Recruiter can only view applicants for their own jobs
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applicants for this job",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("student", "name email profilePhoto")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Applied",
      "Under Review",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(req.params.id)
      .populate("job")
      .populate("student");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Recruiter can only update applications for their own jobs
    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application",
      });
    }

    application.status = status;

    await application.save();

    const Notification = require("../models/Notification");

    await Notification.create({
      recipient: application.student,
      sender: req.user.id,
      title: "Application Status Updated",
      message: `Your application for "${application.job.title}" has been ${status}.`,
      type: "application",
    });

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
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
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
};
