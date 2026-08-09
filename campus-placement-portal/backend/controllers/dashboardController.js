const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const totalCompanies = await Company.countDocuments({
      createdBy: recruiterId,
    });

    const totalJobs = await Job.countDocuments({
      createdBy: recruiterId,
    });
    const jobs = await Job.find({
      createdBy: recruiterId,
    }).select("_id");
    const jobIds = jobs.map((job) => job._id);
    const totalApplications = await Application.countDocuments({
      job: {
        $in: jobIds,
      },
    });

    const applicationStats = await Application.aggregate([
      {
        $match: {
          job: {
            $in: jobIds,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    const stats = {
      Applied: 0,
      "Under Review": 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0,
    };
    for (const item of applicationStats) {
      stats[item._id] = item.count;
    }
    const recentCompanies = await Company.find({
      createdBy: recruiterId,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    const recentJobs = await Job.find({
      createdBy: recruiterId,
    })
      .populate("company", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentApplications = await Application.find({
      job: {
        $in: jobIds,
      },
    })
      .populate("student", "name email")
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,

      dashboard: {
        totalCompanies,
        totalJobs,
        totalApplications,
        stats,
      },

      recentCompanies,

      recentJobs,

      recentApplications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error !",
    });
  }
};
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Total Applied Jobs
    const totalApplications = await Application.countDocuments({
      student: studentId,
    });

    // Total Saved Jobs
    const totalSavedJobs = await SavedJob.countDocuments({
      student: studentId,
    });

    // Application Status Statistics
    const applicationStats = await Application.aggregate([
      {
        $match: {
          student: studentId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const stats = {
      Applied: 0,
      "Under Review": 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0,
    };

    applicationStats.forEach((item) => {
      stats[item._id] = item.count;
    });

    // Recent Applications
    const recentApplications = await Application.find({
      student: studentId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name logo location",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Saved Jobs
    const recentSavedJobs = await SavedJob.find({
      student: studentId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name logo location",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,

      dashboard: {
        totalApplications,
        totalSavedJobs,
        stats,
      },

      recentApplications,
      recentSavedJobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getRecruiterDashboard, getStudentDashboard };
