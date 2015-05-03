var webpack = require('webpack');
var config = require('./webpack.config');

config.plugins = [
  new webpack.optimize.UglifyJsPlugin({ minimize: true })
];

module.exports = config;
