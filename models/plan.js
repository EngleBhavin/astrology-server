const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    amount:{
        type:Number,
        trim:true
    },
    currency:{
        type:String,
        trim:true
    },
    planType:{
        type:String,
        trim:true,
        enum:['monthly','quaterly','halfyearly','yearly']
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
},{timestamps:true});
module.exports = mongoose.model("Plan", planSchema);