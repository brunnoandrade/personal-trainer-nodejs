const router = require('express').Router()

// constrollers
const LicenseController = require('../controllers/LicenseController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.post('/create', verifyToken, LicenseController.create)
router.get('/', LicenseController.getAll)
router.get('/:id', LicenseController.getById)
router.patch('/:id', verifyToken, LicenseController.update)
router.delete('/:id', verifyToken, LicenseController.removeById)

module.exports = router
