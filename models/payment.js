const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    productId:[{
        type:Schema.Types.ObjectId,
        ref:"Product" 
    }],
    paymentId:{
        type:String,
        trim:true,
    },
    paymentType:{
        type:String,
        trim:true,
        Enumerator:["COD","ONLINE","PAYTM","UPI","CARD","NETBANKING","WALLET","PAYPAL","cod","online","paytm","upi","card","netbanking","wallet","paypal"]
    },
    amount:[{
        type:String,
        trim:true,
    }],
    paymentStatus:{
        type:String,
        trim:true,
        Enumerator:["SUCCESS","FAILED","PENDING","success","failed","pending"]
    },
    subscriptionId:{
        type:String,
       trim:true,
    },
    quantity:[{
        type:String,
        trim:true,
    }],
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date}
},{timestamps:true});

module.exports = mongoose.model("Payment", paymentSchema);