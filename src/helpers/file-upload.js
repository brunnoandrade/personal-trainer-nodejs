const multer = require('multer')
const path = require('path')

// Destination to store file
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ''

    if (req.baseUrl.includes('/api/product')) {
      folder = 'products'
    }

    cb(null, `public/files/${folder}/`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const fileUploads = multer({
  storage: fileStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(zip|rar)$/)) {
      return cb(new Error('Please send compressed files only!'))
    }
    cb(undefined, true)
  }
})

module.exports = { fileUploads }
