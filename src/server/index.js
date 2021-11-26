require('dotenv').config()
require('express-async-errors')

const path = require('path')
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const shibbolethCharsetMiddleware = require('./middlewares/shibbolethCharsetMiddleware')
const { PORT, IN_PRODUCTION } = require('./config')
const logger = require('./utils/logger')

const app = express()

app.use(express.json())
app.use(shibbolethCharsetMiddleware)

app.use('/api', (req, res, next) => require('./routes')(req, res, next)) // eslint-disable-line
app.use('/api', (_, res) => res.sendStatus(404))

if (IN_PRODUCTION) {
  const DIST_PATH = path.resolve(__dirname, '../../build')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT}`)
})
