const ObjectId = require('mongoose').Types.ObjectId

// models
const License = require('../models/License')

module.exports = class LicenseController {
  static async create(req, res) {
    const { name, description } = req.body

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }
    if (!description) {
      res.status(422).json({ message: 'A descrição é obrigatória!' })
      return
    }

    const data = new License({
      name: name,
      description: description
    })

    try {
      const result = await data.save()

      res.status(201).json({
        message: 'Registration done successfully!',
        data: result
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const data = await License.find().sort('-createdAt')

    res.status(200).json({
      data
    })
  }

  static async getById(req, res) {
    const { id } = req.params

    const data = await License.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    res.status(200).json({
      data
    })
  }

  static async update(req, res) {
    const { id } = req.params
    const { name, description } = req.body

    const updateData = {}

    const data = await License.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    } else {
      updateData.name = name
    }

    if (!description) {
      res.status(422).json({ message: 'A descrição é obrigatória!' })
      return
    } else {
      updateData.description = description
    }

    await License.findByIdAndUpdate(id, updateData)

    res.status(200).json({ message: 'Registro atualizado com sucesso!' })
  }

  static async removeById(req, res) {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    const data = await License.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    await License.findByIdAndRemove(id)

    res.status(200).json({ message: 'Registration successfully removed!' })
  }
}
