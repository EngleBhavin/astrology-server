const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newFeatureSchema = new Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false
        
    },
    deletedAt:{
        type:Date,
    }

},{timestamps:true});

module.exports = mongoose.model('newFeature',newFeatureSchema);