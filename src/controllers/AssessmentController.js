// helpers
const sendEmail = require('../helpers/send-email')
const { templateEmailRegister } = require('../helpers/email-templates.js')

module.exports = class AssessmentController {
  static async send(req, res) {
    const { name, email, content } = req.body

    try {
      const data = {
        name: name,
        email: email,
        question1: content.question1,
        question2: content.question2,
        question3: content.question3,
        question4: content.question4,
        question5: content.question5,
        question6: content.question6,
        question7: content.question7,
        question8: content.question8,
        question9: content.question9,
        question10: content.question10,
        question11: content.question11,
        question12: content.question12,
        question13: content.question13,
        question14: content.question14,
        question15: content.question15,
        question16: content.question16,
        question17: content.question17,
        question18: content.question18,
        question19: content.question19,
        question20: content.question20
      }

      const output = templateEmailRegister(data, email)
      const mailData = {
        from: 'Murillo Katayama <brunnoandradi@gmail.com>',
        to: 'brunnoandradi@gmail.com',
        subject: '[Murillo Katayama] Nova avaliação recebida',
        html: output
      }

      await sendEmail(mailData)

      res.status(200).json({
        message: 'Send mail success!',
        data: mailData
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
