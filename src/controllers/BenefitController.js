const ObjectId = require('mongoose').Types.ObjectId

// models
const Benefit = require('../models/Benefit')

module.exports = class BenefitController {
  static async create(req, res) {
    const { name } = req.body

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    const data = new Benefit({
      name: name
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
    const data = await Benefit.find().sort('-createdAt')

    res.status(200).json({
      data
    })
  }

  static async getById(req, res) {
    const { id } = req.params

    const data = await Benefit.findOne({ _id: id })

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
    const { name } = req.body

    const updateData = {}

    const data = await Benefit.findOne({ _id: id })

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

    await Benefit.findByIdAndUpdate(id, updateData)

    res.status(200).json({ message: 'Registro atualizado com sucesso!' })
  }

  static async removeById(req, res) {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    const data = await Benefit.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    await Benefit.findByIdAndRemove(id)

    res.status(200).json({ message: 'Registration successfully removed!' })
  }
}
