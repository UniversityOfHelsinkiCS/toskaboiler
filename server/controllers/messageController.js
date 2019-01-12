/**
 * Simple example for backend
 */
const messages = []
let simpleId = 0

const createMessage = (req, res) => {
  const newMessage = {
    id: simpleId,
    body: req.body.message,
  }
  messages.push(newMessage)
  res.send(newMessage).end()
  simpleId += 1
}


module.exports = {
  createMessage,
}
