const webpack = require('webpack')
const express = require('express')
const bodyParser = require('body-parser')
const { PORT, inProduction } = require('@util/common')
const routes = require('@util/routes')
const logger = require('@util/logger')

const app = express()
/**
 * Use hot loading when in development, else serve the static content
 */
if (!inProduction) {
  /* eslint-disable */
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

app.use(bodyParser.json())
app.use('/api', routes)

app.listen(PORT, () => { logger.info(`Started on port ${PORT}`) })
