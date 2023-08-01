const mongoose = require('../db/conn')
const { Schema } = mongoose

const CreditCard = mongoose.model(
  'CreditCards',
  new Schema(
    {
      holder: {
        type: String,
        required: true,
        trim: true
      },
      number: {
        type: String,
        required: true,
        trim: true
      },
      expiration: {
        type: String,
        required: true,
        trim: true
      }
    },
    { timestamps: true }
  )
)

module.exports = CreditCard
