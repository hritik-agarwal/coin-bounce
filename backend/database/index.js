const mongoose = require('mongoose')
const {MONGO_URI} = require('../config/index')

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database connected to host: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Database connected error: ${error}`)
  }
}

module.exports = dbConnect
