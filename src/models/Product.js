const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = mongoose.model(
  'Products',
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
      },
      cover: {
        type: String
      },
      coverPublicId: {
        type: String
      },
      coverSecureUrl: {
        type: String
      },
      changelog: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        trim: true
      },
      licenses: {
        type: Array
      },
      benefits: {
        type: Array
      },
      version: {
        type: String,
        required: true,
        trim: true
      },
      latestRelease: {
        type: String,
        required: true,
        trim: true
      },
      firstRelease: {
        type: String,
        required: true,
        trim: true
      },
      code: {
        type: Number,
        required: true,
        trim: true,
        index: {
          unique: true
        }
      },
      preview: {
        type: String,
        required: true,
        trim: true
      },
      status: {
        type: Boolean
      },
      category: Object,
      files: Object,
      user: Object
    },
    { timestamps: true }
  )
)

module.exports = Product
