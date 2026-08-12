const User = require("../models/User");
const Job = require("../models/Job");

const { getJobMatchAnalysis } = require("../services/aiService");

const getJobMatch = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Get logged-in student's profile
    const student = await User.findById(req.user.id).select(
      "name email college branch year cgpa skills resume profilePhoto bio github linkedin portfolio experience role",
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    if (student.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can use job matching",
      });
    }

    // Get job
    const job = await Job.findById(jobId).populate("company", "name location");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Send student + job information to AI
    const analysis = await getJobMatchAnalysis(student, job);

    return res.status(200).json({
      success: true,
      jobId: job._id,
      analysis,
    });
  } catch (error) {
    console.error("Job Match Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI job match",
    });
  }
};

// ==========================================
const getApplicantJobMatch = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;

    if (!jobId || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Job ID and student ID are required",
      });
    }

    // Get the job
    const job = await Job.findById(jobId).populate("company", "name location");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Make sure this recruiter owns this job
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applicants for this job",
      });
    }

    // Get applicant
    const student = await User.findById(studentId).select(
      "name email college branch year cgpa skills resume profilePhoto bio github linkedin portfolio experience role",
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a student",
      });
    }

    // Compare applicant with the recruiter's job
    const analysis = await getJobMatchAnalysis(student, job);

    return res.status(200).json({
      success: true,
      jobId: job._id,
      studentId: student._id,
      analysis,
    });
  } catch (error) {
    console.error("Applicant Job Match Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI applicant match",
    });
  }
};

module.exports = {
  getJobMatch,
  getApplicantJobMatch,
};
