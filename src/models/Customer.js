const mongoose = require('../db/conn')
const { Schema } = mongoose

const Customer = mongoose.model(
  'Customers',
  new Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        index: {
          unique: true
        }
      },
      cartItem: Array,
      // creditCard: Object,
      billingAddress: Object,
      user: Object
    },
    { timestamps: true }
  )
)

module.exports = Customer
