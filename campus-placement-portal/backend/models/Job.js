const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    salary: {
      type: Number,
      required: true,
    },

    experienceLevel: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship"],
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
