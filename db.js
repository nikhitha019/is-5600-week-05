// db.js
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://root:example@localhost:27017/?authSource=admin'
)

const db = mongoose

db.connection.on('connected', () => {
  console.log('✅ MongoDB connected')
})

db.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

module.exports = db
