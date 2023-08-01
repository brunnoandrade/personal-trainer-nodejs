// models
const Product = require('../models/Product')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const File = require('../models/File')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class FileController {
  static async getAllUser(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const customer = await Customer.findOne({ 'user._id': user._id }, '_id')

    const order = await Order.find({ 'customer._id': customer._id }, 'items')

    const items = order?.map((item) => item.items).flat()

    const data = items?.map((item) => item.files).flat()

    res.status(200).json({
      data
    })
  }

  static async fileUploads(req, res) {
    const slug = req.params.slug

    const product = await Product.findOne({ slug: slug })

    if (!product) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No files uploaded.' })
    }

    const filePath = req.file.path
    const fileName = req.file.originalname
    const downloadLink = `public/files/products/${req.file.filename}`

    const files = new File({
      fileName: fileName,
      filePath: filePath,
      downloadLink: downloadLink
    })

    const options = { upsert: true, new: true }

    try {
      const response = await Product.findOneAndUpdate(
        product._id,
        {
          $push: {
            files
          }
        },
        options
      )

      const data = {
        _id: response._id,
        product: response.product,
        files: response.files
      }

      res.json({
        message: 'File uploaded successfully.',
        data: data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
