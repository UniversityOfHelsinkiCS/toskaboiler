const Router = require('express')
const { createMessage } = require('@controllers/messageController')

const router = Router()

router.get('/', (req, res) => {
  res.send('root')
})

router.get('/ping', (req, res) => res.send('pong'))
router.post('/messages', createMessage)

module.exports = router
