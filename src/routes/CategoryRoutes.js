const router = require('express').Router()

// constrollers
const CategoryController = require('../controllers/CategoryController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.post('/create', verifyToken, CategoryController.create)
router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getById)
router.get('/slug/:slug', CategoryController.getBySlug)
router.patch('/:id', verifyToken, CategoryController.update)
router.delete('/:id', verifyToken, CategoryController.removeById)

module.exports = router
