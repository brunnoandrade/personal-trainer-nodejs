const router = require('express').Router()

// constrollers
const CustomerController = require('../controllers/CustomerController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.get('/', CustomerController.getAll)
router.get('/:id', CustomerController.getById)
router.patch('/:id', verifyToken, CustomerController.update)
router.post(
  '/:id/credit-card',
  verifyToken,
  CustomerController.createCreditCard
)
router.post(
  '/:id/billing-address',
  verifyToken,
  CustomerController.createBillingAddress
)

module.exports = router
