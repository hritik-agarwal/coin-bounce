const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')

const router = require('./route/index')
const {PORT} = require('./config/index')
const dbConnect = require('./database/index')
const errorHandler = require('./middleware/error')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(router)
app.use('/storage', express.static('storage'))
app.use(errorHandler)

const serverStart = async () => {
  await dbConnect()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

serverStart()
