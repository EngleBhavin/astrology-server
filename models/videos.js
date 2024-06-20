const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    link:{
        type:String,
        trim:true
    },
    video:{
        type:String,
        trim:true
    },
    gallery:{
        type:Schema.Types.ObjectId,
        ref:'Gallery'
    },

    views:{
        type:Number,
        trim:true
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
},{timestamps:true});
module.exports = mongoose.model('Video',videoSchema)
