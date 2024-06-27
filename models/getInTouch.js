const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getInTouchSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: String,
    },
    address: {
      nationality: { type: String, trim: true },
      state: { type: String, trim: true },
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String },
    },
    message: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    sendMessageEmail: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)
module.exports = mongoose.model('getInTouch', getInTouchSchema)
