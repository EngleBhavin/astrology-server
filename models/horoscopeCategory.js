const mongoose = require("mongoose");

const horoscopeCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    horoscope:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Horoscope"
    },
     
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("HoroscopeCategory", horoscopeCategorySchema);
