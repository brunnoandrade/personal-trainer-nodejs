const express = require('express')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
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

// Open API (Swagger)
const options = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Bolio Store',
      description: 'API da Bolio Store',
      contact: {
        name: 'Brunno Andrade'
      }
    }
  },
  apis: ['./src/routes/*.js']
}

const docs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs))

// Routes
const UserRoutes = require('./src/routes/UserRoutes')
const CustomerRoutes = require('./src/routes/CustomerRoutes')
const ProductRoutes = require('./src/routes/ProductRoutes')
const CategoryRoutes = require('./src/routes/CategoryRoutes')
const BenefitRoutes = require('./src/routes/BenefitRoutes')
const LicenseRoutes = require('./src/routes/LicenseRoutes')
const CartItemRoutes = require('./src/routes/CartItemRoutes')
const OrderRoutes = require('./src/routes/OrderRoutes')
const FileRoutes = require('./src/routes/FileRoutes')

app.use('/api/user', UserRoutes)
app.use('/api/customer', CustomerRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/benefit', BenefitRoutes)
app.use('/api/license', LicenseRoutes)
app.use('/api/cart-item', CartItemRoutes)
app.use('/api/order', OrderRoutes)
app.use('/api/file-upload', FileRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT)
})
