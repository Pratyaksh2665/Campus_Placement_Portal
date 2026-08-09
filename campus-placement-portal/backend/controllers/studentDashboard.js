const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

const getstudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found !",
      });
    }
    const totalAppliedJobs = await Application.countDocuments({
      student: studentId,
    });
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
      pending: 0,
      accepted: 0,
      rejected: 0,
    };

    for (const item of applicationStats) {
      stats[item._id] = item.count;
    }

    const resumeUploaded = !!user.resume;
    const profileFields = [
      user.name,
      user.email,
      user.phone,
      user.college,
      user.branch,
      user.year,
      user.cgpa,
      user.resume,
    ];
    const completedFields = profileFields.filter((field) => field).length;
    const profileCompletion = Math.round(
      (completedFields / profileFields.length) * 100,
    );
    const recentApplications = await Application.find({
      student: studentId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentJobs = await Job.find()
      .populate("company", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      dashboard: {
        profileCompletion,
        resumeUploaded,
        totalAppliedJobs,
        pending: stats.pending,
        accepted: stats.accepted,
        rejected: stats.rejected,
      },
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

module.exports = { getstudentDashboard };
