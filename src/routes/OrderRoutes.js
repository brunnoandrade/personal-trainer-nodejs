const router = require('express').Router()

// constrollers
const OrderController = require('../controllers/OrderController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.post('/', verifyToken, OrderController.create)
router.post('/payment-intent', verifyToken, OrderController.createPaymentIntent)
router.get('/', verifyToken, OrderController.getAll)
router.get('/:order_number', verifyToken, OrderController.getByOrderNumber)

module.exports = router
