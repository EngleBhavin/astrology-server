const mongoose = require("mongoose");   
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,ref:'plan'
        
    },
    planStartDate:{
        type:Date
    },
    planEndDate:{
        type:Date
    },
    paymentId:{
        type:String,
        trim:true
    },
    subscriptionId:{
        type:String,
        trim:true
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
},{timestamps:true});
module.exports = mongoose.model("Subscription", subscriptionSchema);