const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Config JSON response
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Solve CORS
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})

// Public folder for images
app.use(express.static('public'))

// Routes
const AssessmentRoutes = require('./src/routes/AssessmentRoutes')

app.use('/api/assessment', AssessmentRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT)
})
