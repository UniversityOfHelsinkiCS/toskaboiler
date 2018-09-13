import express from 'express'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import hotMiddleWare from 'webpack-hot-middleware'
import bodyParser from 'body-parser'
import { PORT, NODE_ENV } from '../config'
import webpackConf from '../webpack.config'
import routes from './routes'

const app = express();

/**
 * Use hot loading when in development, else serve the static content
 */
if (NODE_ENV === 'development') {
    const compiler = webpack(webpackConf('development', { mode: 'development' }))
    app.use(middleware(compiler))
    app.use(hotMiddleWare(compiler))
} else {
    app.use('/', express.static('dist/'))
}

app.use(bodyParser.json())
app.use('/api', routes)

app.listen(PORT, () => { console.log(`Started on port ${PORT}`) })