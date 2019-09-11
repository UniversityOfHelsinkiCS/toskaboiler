const express = require('express')
require('express-async-errors')
const { PORT, inProduction } = require('@util/common')
const routes = require('@util/routes')
const logger = require('@util/logger')
const errorMiddleware = require('@middleware/errorMiddleware')

const app = express()
/**
 * Use hot loading when in development, else serve the static content
 */
if (!inProduction) {
  /* eslint-disable */
  const webpack = require('webpack')
  const middleware = require('webpack-dev-middleware')
  const hotMiddleWare = require('webpack-hot-middleware')
  const webpackConf = require('@root/webpack.config')
  /* eslint-enable */
  const compiler = webpack(webpackConf('development', { mode: 'development' }))
  app.use(middleware(compiler))
  app.use(hotMiddleWare(compiler))
} else {
  app.use('/', express.static('dist/'))
}

app.use(express.json())
app.use('/api', routes)

app.use(errorMiddleware)

app.listen(PORT, () => { logger.info(`Started on port ${PORT}`) })
