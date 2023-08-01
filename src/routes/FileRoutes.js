const router = require('express').Router()

// constrollers
const FileController = require('../controllers/FileController')

// multer
const { fileUploads } = require('../helpers/file-upload')

router.get('/', FileController.getAllUser)
router.post('/:slug', fileUploads.single('file'), FileController.fileUploads)

module.exports = router
