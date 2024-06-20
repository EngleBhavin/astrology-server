const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    }, 
    feedBacks:[{
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        points:{
            type:Number,
        },
        _id:false
    }],
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
module.exports = mongoose.model('feedback', feedbackSchema)
