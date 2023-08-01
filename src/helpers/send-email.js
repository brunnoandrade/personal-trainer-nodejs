const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  // port: 1025,
  // host: 'localhost',
  // auth: {
  //   user: 'brunnoandradi@gmail.com',
  //   pass: '13847123zz'
  // },
  // secure: true
  address: 'localhost',
  port: 1025,
  enable_starttls_auto: false
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
