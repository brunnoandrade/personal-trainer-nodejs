const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId

// models
const User = require('../models/User')
const Customer = require('../models/Customer')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token')
const sendEmail = require('../helpers/send-email')
const { templateEmailRegister } = require('../helpers/email-templates.js')

module.exports = class UserController {
  static async register(req, res) {
    const { firstName, lastName, email, password, role } = req.body

    if (!firstName) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!lastName) {
      res.status(422).json({ message: 'O sobrenome é obrigatório!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    try {
      const userExists = await User.findOne({ email: email })

      if (userExists) {
        res.status(422).json({ message: 'Email is already being used!' })
        return
      }

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(
        password,
        salt + process.env.SALT_KEY
      )

      const userModel = new User({
        email: email,
        password: passwordHash,
        role: role
      })

      const user = await userModel.save()

      const customerModel = new Customer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        user: {
          _id: user._id,
          email: user.email,
          status: user.status,
          role: user.role
        }
      })

      await customerModel.save()

      const output = templateEmailRegister(customerModel, user)
      const mailData = {
        from: 'Bolio Store <brunnoandradi@gmail.com>',
        to: user.email,
        subject: '[Bolio Store] Your account has been created',
        html: output
      }
      await sendEmail(mailData)

      await createUserToken(user, customerModel, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res) {
    const email = req.body.email
    const password = req.body.password

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    // check if user exists
    const user = await User.findOne({ email: email })

    const customer = await Customer.findOne(
      { 'user._id': user._id },
      'firstName lastName name email'
    )

    if (!user) {
      return res
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail!' })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(422).json({ message: 'Senha inválida' })
    }

    await createUserToken(user, customer, req, res)
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, process.env.SECRET_KEY)

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    const customer = await Customer.findOne(
      { 'user._id': currentUser._id },
      'firstName lastName name email'
    )

    const data = {
      _id: currentUser._id,
      email: currentUser.email,
      status: currentUser.status,
      role: currentUser.role,
      customer
    }

    res.status(200).json({
      user: data
    })
  }

  static async getAll(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    const data = await User.find(
      { 'user._id': { $ne: user._id } },
      'email status role'
    ).sort('-createdAt')

    res.status(200).json({
      data
    })
  }

  static async getById(req, res) {
    const id = req.params.id

    const data = await User.findById(id, 'email status role')

    if (!data) {
      res.status(422).json({ message: 'Register not found!' })
      return
    }

    res.status(200).json({ data })
  }

  static async update(req, res) {
    const id = req.params.id
    const password = req.body.password
    const status = req.body.status
    const role = req.body.role

    const updateData = {}

    const data = await User.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    if (!status) {
      res.status(422).json({ message: 'O status é obrigatório!' })
      return
    } else {
      updateData.status = status
    }

    if (!role) {
      res.status(422).json({ message: 'O role é obrigatório!' })
      return
    } else {
      updateData.role = role
    }

    if (password) {
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(
        reqPassword,
        salt + process.env.SALT_KEY
      )

      updateData.password = passwordHash
    }

    try {
      const user = await User.findByIdAndUpdate(id, updateData)
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: user
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async removeById(req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    const data = await User.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    await User.findByIdAndRemove(id)

    res.status(200).json({ message: 'Registration successfully removed!' })
  }

  static async changePassword(req, res) {
    const currentPassword = req.body.currentPassword
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    const updateData = {}

    if (!currentPassword) {
      res.status(422).json({ message: 'Current password is required!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'Password is required!' })
      return
    }

    if (!confirmPassword) {
      res.status(422).json({ message: 'Password confirm is required!' })
      return
    }

    // check if user exists
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (!user) {
      return res
        .status(422)
        .json({ message: 'There is no user registered with this email!' })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(currentPassword, user.password)

    if (!checkPassword) {
      return res.status(422).json({ message: 'Invalid password!' })
    }

    if (password !== confirmPassword) {
      res.status(422).json({ error: 'Passwords do not match!' })

      // change password
    } else if (password == confirmPassword && password) {
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(
        reqPassword,
        salt + process.env.SALT_KEY
      )

      updateData.password = passwordHash
    }

    try {
      const data = await User.findByIdAndUpdate(user._id, updateData)

      res.json({
        message: 'Password changed successfully!',
        data
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
