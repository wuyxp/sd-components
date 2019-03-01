const marge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'lazydiv.js',
    library: '@sd/LazyDiv',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
module.exports = marge(base, config)
