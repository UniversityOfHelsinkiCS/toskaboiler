const errorHandler = (error, req, res, next) => {
  console.error(error.message, error.name, error.kind)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ApplicationError') {
    return res.status(error.status).send({ error: error.message })
  }

  return next(error)
}

module.exports = errorHandler
