const mongoose = require('mongoose')

const {
  ENVIRONMENT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DATABASE,
  MONGO_LOCAL_URI
} = process.env

const isProd = ENVIRONMENT === 'production'

const MONGODB_URI = !isProd
  ? MONGO_LOCAL_URI
  : 'mongodb+srv://' +
    MONGO_USER +
    ':' +
    MONGO_PASSWORD +
    '@' +
    MONGO_HOST +
    '/' +
    MONGO_DATABASE +
    '?retryWrites=true&w=majority'

async function main() {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Mongodb connected - ' + ENVIRONMENT)
    })
    .catch((err) => console.log(err.message))

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...')
  })

  mongoose.connection.on('error', (err) => {
    console.log(err.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...')
  })
}

main().catch((err) => console.log(err))

module.exports = mongoose
