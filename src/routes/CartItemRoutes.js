const router = require('express').Router()

// constrollers
const CartItemController = require('../controllers/CartItemController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.get('/', verifyToken, CartItemController.getAllUser)
router.post('/add', verifyToken, CartItemController.addCartItem)
router.post('/remove', verifyToken, CartItemController.removeCartItem)

module.exports = router
