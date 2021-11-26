const { NotFoundError, UserInputError } = require('../utils/errors')

/**
 * Simple example for backend
 */
let messages = []
let simpleId = 0

const getAll = async (req, res) => {
  res.send(messages)
}

const create = async (req, res) => {
  const { message } = req.body

  if (typeof message !== 'string') {
    throw new UserInputError('Message is required')
  }

  if (message.length > 500) {
    throw new UserInputError('Maximum message length is 500 characters')
  }

  const newMessage = {
    id: simpleId,
    body: message,
  }

  messages.unshift(newMessage)

  messages = messages.slice(0, 50)

  res.send(newMessage)

  simpleId += 1
}

const getOne = async (req, res) => {
  const message = messages.find((m) => m.id === req.params.id)

  if (!message) throw new NotFoundError('Message is not found')

  res.send(message)
}

const update = async (req, res) => {
  const message = messages.find((m) => m.id === req.params.id)

  message.body = req.body.message

  messages = messages.filter((m) => m.id === message.id)

  messages.push(message)

  res.send(message)
}

const destroy = async (req, res) => {
  messages = messages.filter((m) => m.id === req.params.id)

  res.sendStatus(200)
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
}
