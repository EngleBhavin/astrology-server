const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gallerySchema = new Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        trim:true
    },
    videoCount:{
        type:Number,
        default:0
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
},{timestamps:true});
module.exports = mongoose.model('Gallery',gallerySchema)