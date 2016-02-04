// Polyfill ES6
require('babel-polyfill')

// Global configuration
require('./config')

// Vendor Globals (not used by typescript)
require('./globals')

// CSS Libs
/* Roboto Font and Material Icons */
require('../assets/style/material.rawcss')

// JS Libs
require('react-mdl/extra/material.min.js')

// Application entries
require('../assets/style/app.css')
require('../src')
