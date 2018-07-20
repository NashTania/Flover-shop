const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const $ = require("jquery");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dev')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  }
});
