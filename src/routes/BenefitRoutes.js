const router = require('express').Router()

// constrollers
const BenefitController = require('../controllers/BenefitController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.post('/create', verifyToken, BenefitController.create)
router.get('/', BenefitController.getAll)
router.get('/:id', BenefitController.getById)
router.patch('/:id', verifyToken, BenefitController.update)
router.delete('/:id', verifyToken, BenefitController.removeById)

module.exports = router
