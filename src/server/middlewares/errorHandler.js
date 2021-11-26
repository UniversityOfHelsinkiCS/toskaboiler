const { ApplicationError } = require('../utils/errors')
const logger = require('../utils/logger')

const errorHandler = (error, req, res, next) => {
  logger.error(`${error.message} ${error.name} ${error.stack}`)

  if (res.headersSent) {
    return next(error)
  }

  let normalizedError = new ApplicationError('Something went wrong')

  if (error instanceof ApplicationError) {
    normalizedError = error
  }

  return res.status(normalizedError.status).json(normalizedError)
}

module.exports = errorHandler
