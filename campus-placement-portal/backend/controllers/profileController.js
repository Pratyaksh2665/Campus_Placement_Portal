const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedFields = {};

    ["name", "phone", "college", "branch", "year", "cgpa", "skills"].forEach(
      (field) => {
        if (req.body[field] !== undefined) {
          updatedFields[field] = req.body[field];
        }
      },
    );

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        resume: result.secure_url,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: updatedUser.resume,
    });
  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
};
