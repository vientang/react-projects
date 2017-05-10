const webpack = require('webpack')

module.exports = {
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: __dirname,
    filename: "bundle.js",
    sourceMapFilename: 'bundle.map.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ["es2015", "react"]}},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.(png|jpg|gif|ttf|svg|woff|woff2|eot)$/, loader: 'url-loader'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      bootstrap: "bootstrap"
    })
  ]
}
