const router = require('express').Router()

// constrollers
const AssessmentController = require('../controllers/AssessmentController')

router.post('/send-mail', AssessmentController.sendEmail)

module.exports = router
