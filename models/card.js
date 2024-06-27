const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    horoscope: 
      {
        type: Schema.Types.ObjectId,
        ref: "Horoscope",
      },
    horoscopeCategory:
      {
        type: Schema.Types.ObjectId,
        ref: "HoroscopeCategory",
      },
 
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Card", cardSchema);
