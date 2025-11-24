// app.js
const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

// static files
app.use(express.static(__dirname + '/public'))

// JSON body parsing + CORS
app.use(bodyParser.json())
app.use(middleware.cors)

// routes
app.get('/', api.handleRoot)

// product routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// order routes
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// 404 + error handlers
app.use(middleware.notFound)
app.use(middleware.handleError)

// Boot the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app
