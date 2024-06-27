const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },
    paymentGeneratedId:{
        type:String,
        trim:true,
    },
    orderId:{
        type:String,
        trim:true,
    },
    orderStatus:{
        type:String,
        trim:true,
        default:"pending",
        enum:["pending","confirmed","cancelled","delivered","returned","refunded","completed","processing","shipped","dispatched"]

    },
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date}
},{timestamps:true});
module.exports = mongoose.model("Order", orderSchema);