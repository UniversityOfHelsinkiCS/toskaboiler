/**
 * Simple example for backend
 */
let messages = []
let simpleId = 0

export const createMessage = (req, res) => {
    const newMessage = {
        id: simpleId++,
        body: req.body.message
    }
    messages.push(newMessage)
    res.send(newMessage).end()
}