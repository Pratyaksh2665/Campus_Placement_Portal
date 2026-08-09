const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["application", "job", "company", "profile", "system"],
      default: "system",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Notification", notificationSchema);
