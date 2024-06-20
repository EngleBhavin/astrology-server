const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profileImg: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    countryCode: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },

    email: {
      type: String,

      trim: true,
    },
    otp: {
      type: String,
      trim: true,
    },
    otpExpiration: {
      type: Date,
    },
    address: {
      nationality: { type: String, trim: true },
      state: { type: String, trim: true },
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String },
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      },
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subscription',
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true },
)

module.exports = mongoose.model('user', userSchema)
