// helpers
const sendEmail = require('../helpers/send-email')
const { templateEmailRegister } = require('../helpers/email-templates.js')

module.exports = class AssessmentController {
  static async send(req, res) {
    const { name, email, content, files } = req.body

    try {
      const data = {
        name: name,
        email: email,
        question1: content.question1 || 'Não respondido',
        question2: content.question2 || 'Não respondido',
        question3: content.question3 || 'Não respondido',
        question4: content.question4 || 'Não respondido',
        question5: content.question5 || 'Não respondido',
        question6: content.question6 || 'Não respondido',
        question7: content.question7 || 'Não respondido',
        question8: content.question8 || 'Não respondido',
        question9: content.question9 || 'Não respondido',
        question10: content.question10 || 'Não respondido',
        question11: content.question11 || 'Não respondido',
        question12: content.question12 || 'Não respondido',
        question13: content.question13 || 'Não respondido',
        question14: content.question14 || 'Não respondido',
        question15: content.question15 || 'Não respondido',
        question16: content.question16 || 'Não respondido',
        question17: content.question17 || 'Não respondido',
        question18: content.question18 || 'Não respondido',
        question19: content.question19 || 'Não respondido'
      }

      const output = templateEmailRegister(data, email)
      const mailData = {
        from: 'Murillo Katayama <contato@murillokatayama.com.br>',
        to: 'brunnoandradi@gmail.com',
        subject: `[${data.name}] Nova avaliação recebida`,
        html: output,
        attachments: files.map((item, index) => {
          try {
            return {
              filename: 'Foto[' + index + '] - ' + name + '.png',
              content: item.base64String,
              encoding: 'base64'
            }
          } catch (error) {
            return res.status(400).json({
              message: 'Send mail error! - ' + error
            })
          }
        })
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
