const path = require('path');
const $ = require("jquery");
const webpack = require('webpack');
const _ = require('underscore');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
      }, {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/css'),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
    new webpack.ProvidePlugin({_: 'underscore'}),
    new ExtractTextPlugin({filename: './css/style.bundle.css', allChunks: true})
  ]

}
