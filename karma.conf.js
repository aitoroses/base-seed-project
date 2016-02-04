var webpack = require('webpack')
var path = require('path')

var webpackConfig = require('./webpack.config.base')

module.exports = function(config) {
  config.set({

    browserNoActivityTimeout: 30000,

    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    }

  })
}
