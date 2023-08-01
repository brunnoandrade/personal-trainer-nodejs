// const bcrypt = require('bcrypt')
// const ObjectId = require('mongoose').Types.ObjectId

// models
const Customer = require('../models/Customer')
const CreditCard = require('../models/CreditCard')
const BillingAddress = require('../models/BillingAddress')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class CustomerController {
  static async getAll(req, res) {
    const data = await Customer.find(
      {},
      'firstName lastName name email creditCard billingAddress user'
    ).sort('-createdAt')

    res.status(200).json({
      data
    })
  }

  static async getById(req, res) {
    const id = req.params.id

    const data = await Customer.findById(
      id,
      'firstName lastName name email creditCard billingAddress user'
    )

    if (!data) {
      res.status(422).json({ message: 'Register not found!' })
      return
    }

    res.status(200).json({ data })
  }

  static async update(req, res) {
    const { id } = req.params
    const { firstName, lastName } = req.body

    const updateData = {}

    const data = await Customer.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    if (!firstName) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
    } else {
      updateData.firstName = firstName
    }

    if (!lastName) {
      res.status(422).json({ message: 'O sobrenome é obrigatório!' })
    } else {
      updateData.lastName = lastName
    }

    await Customer.findByIdAndUpdate(id, updateData)

    res.status(200).json({ message: 'Registro atualizado com sucesso!' })
  }

  static async createCreditCard(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const holder = req.body.holder
    const number = req.body.number
    const expiration = req.body.expiration

    if (!holder) {
      res.status(422).json({ message: 'O títular é obrigatório!' })
      return
    }

    if (!number) {
      res.status(422).json({ message: 'O número é obrigatório!' })
      return
    }

    if (!expiration) {
      res.status(422).json({ message: 'A expiração é obrigatória!' })
      return
    }

    const creditCard = new CreditCard({
      holder: holder,
      number: number,
      expiration: expiration
    })

    const options = { upsert: true, new: true }

    try {
      const data = await Customer.findOneAndUpdate(
        user._id,
        {
          $set: {
            creditCard
          }
        },
        options
      )
      res.json({
        message: 'Cartão informado com sucesso!',
        data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async createBillingAddress(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const { firstName, lastName, companyName, country, email } = req.body

    if (!firstName) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!lastName) {
      res.status(422).json({ message: 'O sobrenome é obrigatório!' })
      return
    }

    if (!country) {
      res.status(422).json({ message: 'O país é obrigatório!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
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
      const data = await Customer.findOneAndUpdate(
        user._id,
        {
          $set: {
            billingAddress
          }
        },
        options
      )
      res.json({
        message: 'Cartão informado com sucesso!',
        data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
