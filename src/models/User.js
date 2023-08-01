const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
  'Users',
  new Schema(
    {
      email: {
        type: String,
        required: true,
        trim: true,
        index: {
          unique: true
        }
      },
      password: {
        type: String,
        required: true,
        trim: true
      },
      status: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
      },
      role: {
        type: String,
        required: true,
        enum: ['admin', 'general', 'customer', 'support']
      }
    },
    { timestamps: true }
  )
)

module.exports = User
