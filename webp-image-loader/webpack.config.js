const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件

// const WebpAndMiniPicPlugin = require('./src/plugins/toWebpAndMiniPic')
// import webpackPluginImageTransformWebpAndMini from 'webpackPluginImageTransformWebpAndMini'
const webpackPluginImageTransformWebpAndMini = require('webpack-plugin-image-transform-webp-and-mini')
// const webpackPluginImageTransformWebpAndMini = require('../../../wuyang/webpack-plugin-image-transform-webp-and-mini/dist/bundle')
// import webpackPluginImageTransformWebpAndMini from '../../../wuyang/webpack-plugin-image-transform-webp-and-mini/dist/bundle'
const fileLoadPath = '[name]-[hash:16].[ext]'
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
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: fileLoadPath
            }
          // },
          // {
          //   loader: 'image-create-webp',
          //   options: {
          //     path: {
          //       dir: path.resolve(__dirname, './src/assets'),
          //       include: ['bg']
          //     }
          //   }
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
    // new WebpAndMiniPicPlugin({
    //   placeholder: fileLoadPath,
    //   webpSrc: src => src.replace(/(?:\.\w+)(\?|$)/, '.webp$1'),
    //   miniSrc: src => src.replace(/\.(\w+?)(\?[\s\S]+)?$/,'-min.$1$2'),
    //   path: {
    //     dir: path.resolve(__dirname, './src/assets'),
    //     include: ['bg']
    //   }
    // }),
    new webpackPluginImageTransformWebpAndMini({
      name: fileLoadPath,
      logger: true,
      webpOptions: {
        src: src => src.replace(/(?:\.\w+)(\?|$)/, '.webp$1')
      },
      miniOptions: {
        src: src => src.replace(/\.(\w+?)(\?[\s\S]+)?$/,'-min.$1$2'),
        resize: {
          width: 100
        }
      },
      paths: {
        dir: path.resolve(__dirname, './src/assets'),
        include: ['bg']
      }
    })
  ]
}

