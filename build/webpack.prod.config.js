const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const Copy = require('copy-webpack-plugin');

const prodConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: 'static/scripts/[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader:'css-loader',options:{minimize: false,importLoaders:1}},
              {loader: 'postcss-loader',options:{config: {path: path.join(__dirname, '../postcss.config.js')} }}
            ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'file-loader',
            options:{
              name: 'static/images/[name].[hash:5].[ext]',
              publicPath: '/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {bypassOnDebug: true}
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: ['html-withimg-loader']
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'Router',
    'axios': 'axios',
    'mobx': 'mobx',
    'mobx-react': 'mobxReact'
  },
  plugins: [
    // 每次打包前，先清空原来目录中的内容
    new CleanWebpackPlugin(
      ['dist'], { 
        root: path.join(__dirname, '..'),
        verbose: true,
        dry: false 
      }
    ),
    //抽离功能js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'static/scripts/common.[hash:5].js'
    }),
    //抽离公共css
    new ExtractTextPlugin('./static/styles/[name].[hash:5].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          // drop_console: true,
      }
    }),
    // 分析代码
    new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../app/index_pro.html'),
        minify:{  //压缩HTML文件
          removeComments:true,  //移除HTML中的注释
          collapseWhitespace:false,  //删除空白符与换行符
          removeEmptyAttributes:true,
          removeAttributeQuotes:true
        },
        chunks: ['common', 'index']
    })
  ]
};
module.exports = merge(config, prodConfig);