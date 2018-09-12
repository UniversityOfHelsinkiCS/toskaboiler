import express from 'express'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import hotMiddleWare from 'webpack-hot-middleware'
import { PORT, NODE_ENV } from '../config'
import webpackConf from '../webpack.config'

const app = express();

if (NODE_ENV === 'development') {
    const compiler = webpack(webpackConf('development', { mode: 'development' }))
    app.use(middleware(compiler))
    app.use(hotMiddleWare(compiler))
} else {
    console.log('static')
    app.use('/', express.static('dist/'))
}

app.get('/api/', (req, res) => {
    res.send('lol')
})

app.listen(PORT, () => { console.log(`Started on port ${PORT}`) })