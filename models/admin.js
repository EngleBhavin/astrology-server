const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        trim:true
    },
    otp:{
        type:String,
        trim:true
    },
    otpExpiration:{
        type:Date
    },
    mobileNumber:{
        type:String,
        trim:true
    },
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date}

},{timestamps:true});
module.exports = mongoose.model("Admin", adminSchema);