const mongoose = require('../db/conn')
const { Schema } = mongoose

const Category = mongoose.model(
  'Categories',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        required: true,
        trim: true,
        index: {
          unique: true
        }
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

module.exports = Category
