/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

let outputFile, mode, devtool;

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  devtool = 'source-map';
  outputFile = pkg.name + '.min.js';
} else {
  mode = 'development';
  devtool = 'eval-source-map';
  outputFile = pkg.name + '.js';
}

const config = {
  mode: mode,
  devtool: devtool,
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: pkg.library,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /(\.jsx?|\.tsx?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = config;
