const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  console.log('🚀 ~ env, argv', env, argv);
  const config = {
    // mode: mode,
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: pkg.name + (argv.mode === 'production' ? '.min' : '') + '.js',
      library: pkg.libraryName,
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true,
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      client: {
        overlay: true,
      },
      host: '0.0.0.0',
      port: 8080,
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
    plugins: [new HtmlWebpackPlugin()],
  };
  return config;
};
