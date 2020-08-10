require('dotenv').config()
require('module-alias/register')
require('express-async-errors')
const express = require('express')
const path = require('path')

const { PORT, inProduction } = require('@util/common')
const logger = require('@util/logger')

const app = express()

// Require is here so we can delete it from cache when files change (*)
app.use('/api', (req, res, next) => require('@root/server')(req, res, next)) // eslint-disable-line
app.use('/api', (_, res) => res.sendStatus(404))

/**
 * Use hot loading when in development, else serve the static content
 */
if (!inProduction) {
  require('@root/config/devmode')(app) // eslint-disable-line
} else {
  const DIST_PATH = path.resolve(__dirname, './dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT}`)
})
