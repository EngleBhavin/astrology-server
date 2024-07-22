const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kundaliSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      toLowercase: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    tob: {
      type: String,
      required: true,
      trim: true,
    },
    birthPlace: {
      type: String,
      required: true,
      trim: true,
    },
    qta: [
      {
      
        question: {
          type: String,
          trim: true,
        },
        answer: {
          type: String,
          trim: true,
        },
        image:{
          type:String,
          trim:true
        }
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Kundali", kundaliSchema);
