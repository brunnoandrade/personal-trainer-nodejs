const router = require('express').Router()

// constrollers
const UserController = require('../controllers/UserController')

// middlewares
const verifyToken = require('../helpers/check-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.patch('/edit/:id', verifyToken, UserController.update)
router.delete('/:id', verifyToken, UserController.removeById)
router.patch('/change-password', verifyToken, UserController.changePassword)

module.exports = router
