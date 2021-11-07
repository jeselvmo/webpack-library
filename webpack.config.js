/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs');
const env = yargs.argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let outputFile, mode, devtool;

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  devtool = 'cheap-module-source-map';
  outputFile = pkg.name + '.min.js';
} else {
  mode = 'development';
  devtool = 'eval-cheap-module-source-map';
  outputFile = pkg.name + '.js';
}

const config = {
  mode: mode,
  devtool: devtool,
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: 'WebpackLibrary',
    libraryTarget: 'umd',
    libraryExport: 'default',
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
  resolve: {
    extensions: ['.json', '.js', '.ts', '.jsx', '.tsx'],
  },
};

module.exports = config;
