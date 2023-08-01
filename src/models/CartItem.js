const mongoose = require('../db/conn')
const { Schema } = mongoose

const CartItem = mongoose.model(
  'CartItems',
  new Schema(
    {
      productId: {
        type: String,
        required: true,
        trim: true
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        trim: true
      },
      image: {
        type: String,
        required: true,
        trim: true
      },
      files: Array
    },
    { timestamps: true }
  )
)

module.exports = CartItem
