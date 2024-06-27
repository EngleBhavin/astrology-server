const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    shipping:{
        type:String,
        trim:true,
    },
    billing:{
        type:String,
        trim:true,
    },
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date}
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);