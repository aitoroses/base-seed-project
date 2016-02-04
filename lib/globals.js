global.React = require('react')
global.ReactRouter = require('react-router')
global.Redux = require('redux')

global.log = function(str) {
  if (global.__config__.__ENV__ === 'development') {
    console.log(str, 'color:green;font-weight:bold;', 'color:blue;', 'color:black;')
  }
}
