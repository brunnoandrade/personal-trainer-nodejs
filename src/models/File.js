const mongoose = require('../db/conn')
const { Schema } = mongoose

const File = mongoose.model(
  'Files',
  new Schema(
    {
      productName: {
        type: String,
        required: true,
        trim: true
      },
      productId: {
        type: String,
        required: true,
        trim: true
      },
      fileName: {
        type: String,
        required: true,
        trim: true
      },
      filePath: {
        type: String,
        required: true,
        trim: true
      },
      downloadLink: {
        type: String,
        required: true,
        trim: true
      }
    },
    { timestamps: true }
  )
)

module.exports = File
