const { Schema, model } = require("mongoose");

const savedJobSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent a student from saving the same job multiple times
savedJobSchema.index(
  {
    student: 1,
    job: 1,
  },
  {
    unique: true,
  },
);

module.exports = model("SavedJob", savedJobSchema);
