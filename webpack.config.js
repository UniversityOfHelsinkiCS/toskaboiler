const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlTemplate = require('html-webpack-template')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const { mode } = argv
  const additionalPlugins = mode === 'production' ?
    [new UglifyJsPlugin()] // Make JS smaller
    : [new webpack.HotModuleReplacementPlugin()] // Enable hot module replacement

  const additionalOptimizations = mode === 'production' ? {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      // Make CSS smaller
      new OptimizeCssAssetsPlugin(),
    ],
  } : {}

  const additionalEntries = mode === 'production' ? []
  : ['webpack-hot-middleware/client?http://localhost:8000']

  return {
    mode: mode,
    entry: [
      'babel-polyfill', // so we don't need to import it anywhere
      './client',
      ...additionalEntries
    ],
    module: {
      rules: [
        { // Load JS files
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        { // Load CSS files
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        { // Load other files
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: ['file-loader'],
        },
      ],
    },
    optimization: {
      ...additionalOptimizations,
    },
    plugins: [
      // Skip the part where we would make a html template
      new HtmlWebpackPlugin({
        inject: false,
        template: htmlTemplate,
        appMountId: 'root',
      }),
      // Extract css
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name]-[id].css',
      }),
      ...additionalPlugins,
    ],
  }
}
