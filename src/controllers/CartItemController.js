const ObjectId = require('mongoose').Types.ObjectId

// models
const Customer = require('../models/Customer')
const CartItem = require('../models/CartItem')
const Product = require('../models/Product')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class CartItemController {
  static async getAllUser(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const data = await Customer.findOne(
      { 'user._id': user._id },
      'firstName lastName name email cartItem user'
    )

    res.status(200).json({
      data
    })
  }

  static async addCartItem(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const productId = req.body.productId

    if (!productId) {
      res.status(422).json({ message: 'Product is required!' })
      return
    }

    const product = await Product.findOne({ _id: productId })

    if (!product) {
      res.status(422).json({ message: 'Register not found!' })
      return
    }

    const cartItem = new CartItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.cover,
      files: product.files
    })

    const options = { upsert: true, new: true }

    try {
      const response = await Customer.findOneAndUpdate(
        user._id,
        {
          $push: {
            cartItem
          }
        },
        options
      )

      const data = {
        _id: response._id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        cartItem: response.cartItem
      }

      res.json({
        message: 'Item successfully added!',
        data: data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async removeCartItem(req, res) {
    const cartItemId = req.body.cartItemId

    if (!cartItemId) {
      res.status(422).json({ message: 'Cart item is required!' })
      return
    }

    try {
      const token = getToken(req)
      const user = await getUserByToken(token)

      const data = await Customer.findOneAndUpdate(
        user._id,
        { $pull: { cartItem: { _id: ObjectId(cartItemId) } } },
        { new: true }
      )

      res.json({
        message: 'Registration successfully removed!',
        data: data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
