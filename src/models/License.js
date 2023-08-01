const mongoose = require('../db/conn')
const { Schema } = mongoose

const License = mongoose.model(
  'Licenses',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      }
    },
    { timestamps: true }
  )
)

module.exports = License
