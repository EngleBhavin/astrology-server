const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carouselProductsSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    toDisplay: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)
module.exports = mongoose.model('carouselProducts', carouselProductsSchema)
