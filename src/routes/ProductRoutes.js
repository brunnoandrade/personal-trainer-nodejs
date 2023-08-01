const router = require('express').Router()

// constrollers
const ProductController = require('../controllers/ProductController')

// middlewares
const verifyToken = require('../helpers/check-token')

// multer
const upload = require('../helpers/multer')

router.post(
  '/create',
  verifyToken,
  upload.single('cover'),
  ProductController.create
)
router.get('/', ProductController.getAll)
router.get('/myposts', ProductController.getAllUser)
router.get('/:id', ProductController.getById)
router.get('/slug/:slug', ProductController.getBySlug)
router.get('/category/:slug', ProductController.getByCategorySlug)
router.patch(
  '/:id',
  verifyToken,
  upload.single('cover'),
  ProductController.update
)
router.delete('/:id', verifyToken, ProductController.removeById)

module.exports = router
