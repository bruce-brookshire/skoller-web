const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin-legacy');

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
)

config.plugins.push(new TerserPlugin())

module.exports = merge(config, {
  devtool: 'none'
});

