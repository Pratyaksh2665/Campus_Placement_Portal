const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
      required: true,
    },
    college: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      min: 1,
      max: 5,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    resume: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },

    github: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
    },

    portfolio: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("User", userSchema);
