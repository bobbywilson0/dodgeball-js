var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './game.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    compress: true
  },
  module: {
    loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      include: path.resolve(__dirname, 'node_modules/pixi.js'),
      loader: 'transform-loader?brfs',
      enforce: 'post'
    }
    ]

  }
}
