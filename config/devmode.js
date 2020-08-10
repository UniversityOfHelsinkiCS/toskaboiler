const chokidar = require('chokidar') // eslint-disable-line
const path = require('path')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware') // eslint-disable-line
const hotMiddleWare = require('webpack-hot-middleware') // eslint-disable-line
const webpackConf = require('@root/webpack.config')

const dev = (app) => {
  console.log('Starting in dev mode')

  // Use "hot loading" in backend
  const watcher = chokidar.watch('server') // Watch server folder
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Reloaded server')
      Object.keys(require.cache).forEach((id) => {
        if (id.includes('server')) delete require.cache[id] // Delete all require caches that point to server folder (*)
      })
    })
  })

  // Use hot loading in frontend
  const compiler = webpack(webpackConf('development', { mode: 'development' }))

  const devMiddleware = middleware(compiler)
  app.use(devMiddleware)
  app.use(hotMiddleWare(compiler))
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err)
        res.set('content-type', 'text/html')
        res.send(result)
        return res.end()
      })
    })
  })
}

module.exports = dev
