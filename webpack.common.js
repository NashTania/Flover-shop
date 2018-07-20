const path = require('path');
const $ = require("jquery");
const webpack = require('webpack');
const _ = require('underscore');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/js/script.js',
  devServer: {
    contentBase: './dev'
    //inline:true,
    //port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }/*, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoader: 2
            }
          },
          "sass-loader"
        ]
      }*/
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
    new webpack.ProvidePlugin({_: 'underscore'}),
    //new MiniCssExtractPlugin({filename: "style.css", chunkFilename: "[name].css"})
  ]

}
