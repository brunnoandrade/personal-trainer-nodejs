const nodemailer = require('nodemailer')

const MAILTRAP_HOST = process.env.NEXT_PUBLIC_MAILTRAP_HOST
const MAILTRAP_PORT = process.env.NEXT_PUBLIC_MAILTRAP_PORT
const MAILTRAP_AUTH_USER = process.env.NEXT_PUBLIC_MAILTRAP_AUTH_USER
const MAILTRAP_AUTH_PASS = process.env.NEXT_PUBLIC_MAILTRAP_AUTH_PASS

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_AUTH_USER,
    pass: MAILTRAP_AUTH_PASS
  },
  logger: true
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
