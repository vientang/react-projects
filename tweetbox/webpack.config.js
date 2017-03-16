var webpack = require('webpack')
var path = require('path')

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    './src/index'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './src'
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader', exclude: /node_modules/},      
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  }
};
