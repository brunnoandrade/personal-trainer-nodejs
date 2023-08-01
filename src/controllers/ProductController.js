const ObjectId = require('mongoose').Types.ObjectId

// models
const Product = require('../models/Product')
const Category = require('../models/Category')
const Customer = require('../models/Customer')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

// cloudinary
// const cloudinary = require('../helpers/cloudinary.config')

module.exports = class ProductController {
  static async create(req, res) {
    const {
      name,
      slug,
      // cover,
      description,
      changelog,
      price,
      licenses,
      benefits,
      version,
      latestRelease,
      firstRelease,
      category,
      code,
      preview,
      user,
      status
    } = req.body

    // let coverResult = ''

    if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!' })
    }

    if (!slug) {
      return res.status(422).json({ message: 'O slug é obrigatório!' })
    }

    if (!description) {
      return res.status(422).json({ message: 'A descrição é obrigatória!' })
    }

    if (!changelog) {
      return res
        .status(422)
        .json({ message: 'A registro de alterações é obrigatório!' })
    }

    if (!price) {
      return res.status(422).json({ message: 'O preço é obrigatório!' })
    }

    if (!licenses) {
      return res.status(422).json({ message: 'A licensa é obrigatória!' })
    }

    if (!benefits) {
      return res.status(422).json({ message: 'A benefício é obrigatório!' })
    }

    if (!version) {
      return res.status(422).json({ message: 'A versão é obrigatória!' })
    }

    if (!latestRelease) {
      return res.status(422).json({ message: 'A último versão é obrigatória!' })
    }

    if (!firstRelease) {
      return res
        .status(422)
        .json({ message: 'A primeira versão é obrigatória!' })
    }

    if (!category) {
      return res.status(422).json({ message: 'A categoria é obrigatória!' })
    }

    if (!code) {
      return res.status(422).json({ message: 'O código é obrigatório!' })
    }

    if (!preview) {
      return res
        .status(422)
        .json({ message: 'A url de preview é obrigatória!' })
    }

    if (!user) {
      return res.status(422).json({ message: 'O usuário é obrigatório!' })
    }

    // if (cover) {
    //   try {
    //     coverResult = await cloudinary.uploader.upload(cover.base64, {
    //       folder: 'product',
    //       public_id: req.params.id,
    //       resource_type: 'auto'
    //     })
    //   } catch (error) {
    //     res.status(500).json({ message: error.message })
    //     return
    //   }
    // }

    const token = getToken(req)
    const dataUser = await getUserByToken(token)

    const productCategory = await Category.findOne({ _id: category })
    const customer = await Customer.findOne({ 'user._id': dataUser._id })

    const data = new Product({
      name: name,
      slug: slug,
      description: description,
      // cover: coverResult.secure_url || '',
      // coverPublicId: coverResult.public_id || '',
      // coverSecureUrl: coverResult.secure_url || '',
      changelog: changelog,
      price: price,
      licenses: licenses,
      benefits: benefits,
      version: version,
      latestRelease: latestRelease,
      firstRelease: firstRelease,
      category: {
        _id: productCategory._id,
        name: productCategory.name,
        slug: productCategory.slug
      },
      code: code,
      preview: preview,
      status: status,
      user: {
        _id: dataUser._id,
        email: dataUser.email,
        customer: {
          _id: customer._id,
          firstName: customer.firstName,
          lastName: customer.lastName
        }
      }
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
    const data = await Product.find().sort('-createdAt')

    res.status(200).json({
      data
    })
  }

  static async getAllUser(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const data = await Product.find({ 'user._id': user._id })

    res.status(200).json({
      data
    })
  }

  static async getById(req, res) {
    const id = req.params.id

    const data = await Product.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    res.status(200).json({
      data
    })
  }

  static async getBySlug(req, res) {
    const slug = req.params.slug

    const data = await Product.findOne({ slug: slug })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    res.status(200).json({
      data
    })
  }

  static async getByCategorySlug(req, res) {
    const slug = req.params.slug

    const data = await Product.find({
      'category.slug': slug
    })

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
    const {
      name,
      slug,
      description,
      changelog,
      price,
      licenses,
      benefits,
      version,
      latestRelease,
      firstRelease,
      category,
      code,
      preview,
      status
    } = req.body

    // let coverResult = ''

    const updateData = {}

    const data = await Product.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    const token = getToken(req)
    const dataUser = await getUserByToken(token)

    if (data.user._id.toString() !== dataUser._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!'
      })
      return
    }

    const productCategory = await Category.findOne({ _id: category })

    if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!' })
    } else {
      updateData.name = name
    }

    if (!slug) {
      return res.status(422).json({ message: 'O slug é obrigatório!' })
    } else {
      updateData.slug = slug
    }

    if (!description) {
      return res.status(422).json({ message: 'A descrição é obrigatória!' })
    } else {
      updateData.description = description
    }

    if (!changelog) {
      return res
        .status(422)
        .json({ message: 'A registro de alterações é obrigatório!' })
    } else {
      updateData.changelog = changelog
    }

    if (!price) {
      return res.status(422).json({ message: 'O preço é obrigatório!' })
    } else {
      updateData.price = price
    }

    if (!licenses) {
      return res.status(422).json({ message: 'A licensa é obrigatória!' })
    } else {
      updateData.licenses = licenses
    }

    if (!benefits) {
      return res.status(422).json({ message: 'A benefício é obrigatório!' })
    } else {
      updateData.benefits = benefits
    }

    if (!version) {
      return res.status(422).json({ message: 'A versão é obrigatória!' })
    } else {
      updateData.version = version
    }

    if (!latestRelease) {
      return res.status(422).json({ message: 'A último versão é obrigatória!' })
    } else {
      updateData.latestRelease = latestRelease
    }

    if (!firstRelease) {
      return res
        .status(422)
        .json({ message: 'A primeira versão é obrigatória!' })
    } else {
      updateData.firstRelease = firstRelease
    }

    if (!category) {
      return res.status(422).json({ message: 'A categoria é obrigatória!' })
    } else {
      updateData.category = {
        _id: productCategory._id,
        name: productCategory.name,
        slug: productCategory.slug
      }
    }

    if (!code) {
      return res.status(422).json({ message: 'O código é obrigatório!' })
    } else {
      updateData.code = code
    }

    if (!code) {
      return res.status(422).json({ message: 'O código é obrigatório!' })
    } else {
      updateData.code = code
    }

    if (!preview) {
      return res
        .status(422)
        .json({ message: 'A url de preview é obrigatória!' })
    } else {
      updateData.preview = preview
    }

    if (status === null) {
      res.status(422).json({ message: 'Status é campo obrigatório!' })
      return
    } else {
      updateData.status = status
    }

    // if (cover) {
    //   if (cover.base64) {
    //     try {
    //       if (data.coverPublicId) {
    //         await cloudinary.uploader.destroy(data.coverPublicId, {
    //           folder: 'product',
    //           public_id: req.params.id,
    //           resource_type: 'auto'
    //         })
    //       }

    //       coverResult = await cloudinary.uploader.upload(cover.base64, {
    //         folder: 'product',
    //         public_id: req.params.id,
    //         resource_type: 'auto'
    //       })

    //       if (coverResult) {
    //         updateData.cover = coverResult.secure_url || ''
    //         updateData.coverPublicId = coverResult.public_id || ''
    //         updateData.coverSecureUrl = coverResult.secure_url || ''
    //       }
    //     } catch (error) {
    //       res.status(500).json({ message: error.message })
    //       return
    //     }
    //   }
    // }

    await Product.findByIdAndUpdate(id, updateData)

    res.status(200).json({ message: 'Registro atualizado com sucesso!' })
  }

  static async removeById(req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    const data = await Product.findOne({ _id: id })

    if (!data) {
      res.status(404).json({ message: 'Register not found!' })
      return
    }

    const token = getToken(req)
    const dataUser = await getUserByToken(token)

    if (data.user._id.toString() !== dataUser._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!'
      })
      return
    }

    // if (data.coverPublicId) {
    //   try {
    //     await cloudinary.uploader.destroy(data.coverPublicId, {
    //       folder: 'product',
    //       public_id: req.params.id,
    //       resource_type: 'auto'
    //     })
    //   } catch (error) {
    //     res.status(500).json({ message: error.message })
    //     return
    //   }
    // }

    await Product.findByIdAndRemove(id)

    res.status(200).json({ message: 'Registration successfully removed!' })
  }
}
