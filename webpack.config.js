const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: [path.resolve(__dirname, 'src/izdelie-27.ts')]
  },
  output: {
    filename: 'izdelie-27.js',
    path: path.resolve(__dirname, 'bin')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};