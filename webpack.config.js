const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlTemplate = require('html-webpack-template')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const { mode } = argv
  const additionalPlugins = mode === 'production'
    ? [] // Make JS smaller
    : [new webpack.HotModuleReplacementPlugin()] // Enable hot module replacement

  const additionalOptimizations = mode === 'production' ? {
    minimizer: [
      // Make CSS smaller
      new OptimizeCssAssetsPlugin(),
    ],
  } : {}

  const additionalEntries = mode === 'production' ? []
    : ['webpack-hot-middleware/client?http://localhost:8000']

  return {
    mode,
    entry: [
      '@babel/polyfill', // so we don't need to import it anywhere
      './client',
      ...additionalEntries,
    ],
    resolve: {
      alias: {
        Utilities: path.resolve(__dirname, 'client/util/'),
        Components: path.resolve(__dirname, 'client/components/'),
        Assets: path.resolve(__dirname, 'client/assets/'),
        Root: path.resolve(__dirname),
      },
    },
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
        title: 'Toska Boilerplate',
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
