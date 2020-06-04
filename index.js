require('dotenv').config()
require('module-alias/register')
const chokidar = require('chokidar')
const express = require('express')
const path = require('path')
require('express-async-errors')

const { PORT, inProduction } = require('@util/common')
const logger = require('@util/logger')

const app = express()

// Require is here so we can delete it from cache when files change (*)
app.use('/api', (req, res, next) => require('@root/server')(req, res, next)) // eslint-disable-line
app.use('/api', (req, res) => res.sendStatus(404))

/**
 *  Use "hot loading" in backend
 */
const watcher = chokidar.watch('server') // Watch server folder
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach((id) => {
      if (id.includes('server')) delete require.cache[id] // Delete all require caches that point to server folder (*)
    })
  })
})

/**
 * Serve the static content for production
 */
if (inProduction) {
  const DIST_PATH = path.resolve(__dirname, 'client', 'build')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT}`)
})
