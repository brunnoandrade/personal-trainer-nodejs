// helpers
const sendEmail = require('../helpers/send-email')
const { templateEmailRegister } = require('../helpers/email-templates.js')

module.exports = class AssessmentController {
  static async sendEmail(req, res) {
    const { name, email } = req.body
    console.log(
      '🚀 ~ file: AssessmentController.js:8 ~ AssessmentController ~ sendEmail ~ name:',
      name
    )

    try {
      const data = {
        name: name
      }

      const output = templateEmailRegister(data, email)
      const mailData = {
        from: 'Bolio Store <brunnoandradi@gmail.com>',
        to: email,
        subject: '[Bolio Store] Your account has been created',
        html: output
      }

      await sendEmail(mailData)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
