const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    } ,
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:String,
        trim:true,
    },
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date}
},{timestamps:true});

module.exports = mongoose.model("Cart", cartSchema);

