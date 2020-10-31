const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')
const webpack = require('webpack')

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
)

module.exports = merge(config, {
  // mode: 'production',
  devtool: 'source-map'
});

