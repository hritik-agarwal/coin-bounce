const {ValidationError} = require('joi')

const errorHandler = (error, req, res, next) => {
  let status = error.status || 500
  let data = {message: error.message || 'Interval Server Error'}
  if (error instanceof ValidationError) status = 400
  return res.status(status).json(data)
}

module.exports = errorHandler
