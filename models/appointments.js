const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    jyotis: {
      type: Schema.Types.ObjectId,
      ref: "jyotis",
    },
    date: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      enum: [
        "PENDING",
        "ACCEPTED",
        "REJECTED",
        "COMPLETED",
        "CANCELLED",
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled",
      ],
      default: "PENDING" || "pending",
    },
    bookingSlot: {
        type: String,
        trim: true,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", appointmentSchema);
