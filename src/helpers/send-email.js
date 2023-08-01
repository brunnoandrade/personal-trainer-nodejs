const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  // auth: {
  //   user: 'brunnoandradi@gmail.com',
  //   pass: '13847123zz'
  // },
  host: 'sandbox.smtp.mailtrap.io',
  port: 25,
  auth: {
    user: '7cef4d57b1eb9b',
    pass: 'df96721fceb86c'
  },
  debug: true, // show debug output
  logger: true // log information in console
  // address: 'localhost',
  // port: 1025,
  // enable_starttls_auto: false
})

const sendEmail = async (mailData, res) => {
  return transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error)
    }
    res
      .status(200)
      .send({ message: 'Send register email', message_id: info.messageId })
  })
}

module.exports = sendEmail
