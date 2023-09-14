const nodemailer = require('nodemailer')

const GMAIL_AUTH_HOST = process.env.GMAIL_AUTH_HOST
const GMAIL_AUTH_PORT = process.env.GMAIL_AUTH_PORT
const GMAIL_AUTH_TYPE = process.env.GMAIL_AUTH_TYPE
const GMAIL_AUTH_USER = process.env.GMAIL_AUTH_USER
const GMAIL_AUTH_CLIENT_ID = process.env.GMAIL_AUTH_CLIENT_ID
const GMAIL_AUTH_CLIENT_SECRET = process.env.GMAIL_AUTH_CLIENT_SECRET
const GMAIL_AUTH_REFRESH_TOKEN = process.env.GMAIL_AUTH_REFRESH_TOKEN
const GMAIL_AUTH_ACCESS_TOKEN = process.env.GMAIL_AUTH_ACCESS_TOKEN

const transporter = nodemailer.createTransport({
  host: GMAIL_AUTH_HOST,
  port: GMAIL_AUTH_PORT,
  secure: true,
  auth: {
    type: GMAIL_AUTH_TYPE,
    user: GMAIL_AUTH_USER,
    clientId: GMAIL_AUTH_CLIENT_ID,
    clientSecret: GMAIL_AUTH_CLIENT_SECRET,
    refreshToken: GMAIL_AUTH_REFRESH_TOKEN,
    accessToken: GMAIL_AUTH_ACCESS_TOKEN
  }
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
