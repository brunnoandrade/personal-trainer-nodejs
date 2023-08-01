const stripe = require('stripe')(process.env.STRIPE_KEY)

// models
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const BillingAddress = require('../models/BillingAddress')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const getNextOrderNumber = require('../helpers/get-next-order-mumber')

module.exports = class OrderController {
  static async createPaymentIntent(req, res) {
    const { cart } = req.body

    if (!cart) {
      res.status(422).json({ message: 'Itens do carrinho são obrigatórios!' })
      return
    }

    const total = cart?.reduce((acc, item) => {
      return acc + item.price
    }, 0)

    const cartProducts = cart?.map((item) => ({
      productId: item.productId
    }))

    const total_in_cents = total * 100

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total_in_cents,
        currency: 'usd',
        metadata: {
          cart: JSON.stringify(cartProducts)
        }
      })

      res.json({
        message: 'Payment intent sent successfully!',
        data: paymentIntent
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async create(req, res) {
    const {
      cart,
      paymentIntentId,
      paymentMethod,
      billingAddress: payloadBillingAddress
    } = req.body

    const token = getToken(req)
    const user = await getUserByToken(token)

    const { firstName, lastName, companyName, country, email } =
      payloadBillingAddress

    if (!firstName) {
      res.status(422).json({ message: 'First name is required!' })
      return
    }

    if (!lastName) {
      res.status(422).json({ message: 'Last name is required!' })
      return
    }

    if (!country) {
      res.status(422).json({ message: 'Country is required!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'Email is required!' })
      return
    }

    const billingAddress = new BillingAddress({
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      country: country,
      email: email
    })

    const options = { upsert: true, new: true }

    try {
      await Customer.findOneAndUpdate(
        user._id,
        {
          $set: {
            billingAddress
          }
        },
        options
      )
    } catch (error) {
      res.status(500).json({ message: error })
    }

    const customer = await Customer.findOne(
      { 'user._id': user._id },
      'firstName lastName name email billingAddress user'
    )

    if (!customer) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    if (!cart) {
      res.status(422).json({ message: 'Cart items are required!' })
      return
    }

    const total = cart?.reduce((acc, item) => {
      return acc + item.price
    }, 0)

    const total_in_cents = total * 100

    let paymentInfo
    if (total_in_cents !== 0) {
      try {
        paymentInfo = await stripe.paymentMethods.retrieve(paymentMethod)
      } catch (error) {
        res.status(500).json({ message: error })
      }
    }

    const currentOrderNumber = await getNextOrderNumber()

    const data = new Order({
      order_number: currentOrderNumber,
      date: Date.now(),
      total_in_cents: total_in_cents,
      payment_intent_id: paymentIntentId,
      card_brand: paymentInfo?.card?.brand,
      card_last4: paymentInfo?.card?.last4,
      status: 'completed',
      customer: customer,
      items: cart
    })

    try {
      const result = await data.save()

      // enviar um email da compra para o usuário
      // await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
      //   {
      //     to: userInfo.email,
      //     from: 'no-reply@wongames.com'
      //   },
      //   {
      //     templateId: 1
      //   },
      //   {
      //     user: userInfo,
      //     payment: {
      //       total: `$ ${total_in_cents / 100}`,
      //       card_brand: entry.card_brand,
      //       card_last4: entry.card_last4
      //     },
      //     games
      //   }
      // )

      res.status(201).json({
        message: 'Registration completed successfully!',
        data: result
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const data = await Order.find().sort('-createdAt')

    res.status(200).json({
      data
    })
  }

  static async getByOrderNumber(req, res) {
    try {
      const order_number = req.params.order_number

      const data = await Order.findOne({ order_number: order_number })

      if (!data) {
        res.status(404).json({ message: 'Register not found!' })
        return
      }

      res.status(200).json({
        data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
