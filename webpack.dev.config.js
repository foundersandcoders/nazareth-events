const webpackBaseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');

module.exports = merge(webpackBaseConfig, {
  devtool: 'inline-source-map',
  watch: true,
});
