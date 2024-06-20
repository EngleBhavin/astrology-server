const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: [
      {
        type: String,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    // subCategory: {
    //   type: Schema.Types.ObjectId,
    //   ref: "SubCategory",
    // },
    price: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      trim: true,
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
    },
    HSNCODE: {
      type: String,
      trim: true,
    },
    GST: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    SKU:{
        type:String,
        trim:true,
    },
    quantity: {
      type: String,
      trim: true,
    },
    isTrending:{
      type:Boolean,
      default:false
    },
    isBestSeller:{
      type:Boolean,
      default:false
    },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
