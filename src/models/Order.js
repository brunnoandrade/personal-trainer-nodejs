const mongoose = require('../db/conn')
const { Schema } = mongoose

const Order = mongoose.model(
  'Orders',
  new Schema(
    {
      order_number: {
        type: Number,
        required: true,
        trim: true
      },
      date: {
        type: Date,
        required: true,
        trim: true
      },
      total_in_cents: {
        type: Number,
        required: true,
        trim: true
      },
      payment_intent_id: {
        type: String,
        required: true,
        trim: true
      },
      card_brand: {
        type: String,
        required: true,
        trim: true
      },
      card_last4: {
        type: String,
        required: true,
        trim: true
      },
      status: {
        type: String,
        required: true,
        enum: ['completed', 'rejected']
      },
      customer: Object,
      items: Array
    },
    { timestamps: true }
  )
)

module.exports = Order
