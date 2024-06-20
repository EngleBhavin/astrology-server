const mongoose = require("mongoose");

const jyotisSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    gender:{
      type:String,
      trim:true,
      enum:["MALE","FEMALE","OTHER","male","female","other"]
    },

    address: {
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
      },
      building: {
        type: String,
        trim: true,
      },
    },
    description: {
      type: String,
      trim: true,
    },
    rating: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    expertIn: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    timeSlots:[{
      day:{type:String,trim:true},
      time:[{
        start:{type:String,trim:true},
        end:{type:String,trim:true},
        _id:false
      }],
      _id:false
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jyotis", jyotisSchema);
