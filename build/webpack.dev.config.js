const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {loader:'css-loader',options:{minimize: true,importLoaders:1}},
          {loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        use:[{
          loader: 'file-loader',
          options:{
            name:'static/images/[name].[hash:5].[ext]'
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        use: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    //自动打开浏览器
    new OpenBrowserPlugin({
      url: `http://localhost:8080/index.html`,
    }),
    //生成sourceMap
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../app/index.html'),
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/'),
    watchContentBase: true,
    historyApiFallback: true,
    compress: true,
    inline: true,
    hot: true
  }
};

module.exports = merge(config, devConfig);