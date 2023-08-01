const mongoose = require('../db/conn')
const { Schema } = mongoose

const BillingAddress = mongoose.model(
  'BillingAddresses',
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
      companyName: {
        type: String,
        required: false,
        trim: true
      },
      country: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      }
    },
    { timestamps: true }
  )
)

module.exports = BillingAddress
