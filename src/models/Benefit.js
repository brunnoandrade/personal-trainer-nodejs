const mongoose = require('../db/conn')
const { Schema } = mongoose

const Benefit = mongoose.model(
  'Benefities',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      }
    },
    { timestamps: true }
  )
)

module.exports = Benefit
