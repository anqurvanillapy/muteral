const webpack = require('webpack')
const path = require('path')
const IS_DEV = process.env.NODE_ENV === 'development'

module.exports = {
  context: __dirname,
  entry: 'index.js',
  output: {
    filename: 'muteral',
    path: path.join(__dirname, 'dist')
  },
  devtool: IS_DEV ? 'source-map' : false,
  module: {
    rule: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ].concat(IS_DEV ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      include: /\.min\.js$/
    })
  ])
}
