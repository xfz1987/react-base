const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: ['babel-polyfill', path.resolve(__dirname, '../app/main.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'static/scripts/[name].[hash:5].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      components: path.resolve(__dirname, '/../app/components'),
      api: path.resolve(__dirname, '/../app/api'),
      common: path.resolve(__dirname, '/../app/common'),
      pages: path.resolve(__dirname, '/../app/pages'),
      stores: path.resolve(__dirname, '/../app/stores')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015','stage-1','react'],
            plugins: ['transform-decorators-legacy','transform-decorators','transform-runtime']
          }
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        exclude: /node_modules/,
        use:[{
          loader: 'file-loader',
          options:{
            name: 'static/fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use:[{
          loader: 'file-loader',
          options:{
            mimetype: 'application/font-woff',
            name: 'static/fonts/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ]
};