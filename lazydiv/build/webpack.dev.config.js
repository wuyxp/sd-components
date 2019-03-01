const marge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')
const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
module.exports = marge(base, config)
