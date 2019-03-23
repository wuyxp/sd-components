const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件

const WebpAndMiniPicPlugin = require('./src/plugins/toWebpAndMiniPic')

module.exports = {
  mode:'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/loaders')
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          // {
          //   loader: 'image-create-webp',
          //   options: {
          //     name: '[name].[ext]?[hash]'
          //   }
          // },
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: 8000
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin(),
    new WebpAndMiniPicPlugin({
      path: {
        dir: path.resolve(__dirname, './src/assets'),
        include: ['bg']
      }
    })
  ]
}

