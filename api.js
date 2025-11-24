// api.js
const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 */
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
}

/**
 * List all products
 */
async function listProducts (req, res) {
  const { offset = 0, limit = 25, tag } = req.query
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
  res.json(products)
}

/**
 * Get a single product
 */
async function getProduct (req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)
  if (!product) return next()
  res.json(product)
}

/**
 * Create a product
 */
async function createProduct (req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit a product
 */
async function editProduct (req, res, next) {
  const product = await Products.edit(req.params.id, req.body)
  if (!product) return next()
  res.json(product)
}

/**
 * Delete a product
 */
async function deleteProduct (req, res) {
  const result = await Products.destroy(req.params.id)
  res.json(result)
}

/**
 * Create an order
 */
async function createOrder (req, res) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * List orders
 */
async function listOrders (req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  })

  res.json(orders)
}

/**
 * Get an order
 */
async function getOrder (req, res, next) {
  const order = await Orders.get(req.params.id)
  if (!order) return next()
  res.json(order)
}

/**
 * Edit an order
 */
async function editOrder (req, res, next) {
  const order = await Orders.edit(req.params.id, req.body)
  if (!order) return next()
  res.json(order)
}

/**
 * Delete an order
 */
async function deleteOrder (req, res) {
  await Orders.destroy(req.params.id)
  res.json({ success: true })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
})
