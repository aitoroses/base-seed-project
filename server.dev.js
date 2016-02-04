'use strict'

// let express = require('express')

let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
//
// -------- Start Config -------------------
let config = require('./webpack.config.base.js')

config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new webpack.NoErrorsPlugin())

config.output = {}
config.output.path = '/'
config.output.publicPath = 'lib/' // Needed by hot app updates path
config.devServer = {

  // HMR configuration
  host: process.env.HMR_HOST || "dev-server", // Used for client connection
  port: process.env.HMR_PORT || 8080,
  path: process.env.HMR_PATH || "",

  hot: true,
  quiet: false,
  noInfo: false,
  publicPath: `/${config.output.publicPath}`, // Where to serve assets from
  filename: "bundle.js",
  stats: {
    colors: true,
    hash: false,
    timings: false,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: false,
    children: true
  }
}

config.entry = {
  bundle: [
    `webpack-dev-server/client?http://${config.devServer.host}:${config.devServer.port}${config.devServer.path}/sockjs-node`,
    'webpack/hot/only-dev-server',
    process.env.PLAYGROUND ? './test/playground.js' : './lib/main.js'
  ]
}
// -------- End Config -------------------


let compiler = webpack(config)
let server = new WebpackDevServer(compiler, config.devServer)
// server.use(express.static(__dirname))

// ------ run the two servers -------
server.listen(8080, function() {
    console.log('Server is listening on port 8080')
})

// ------ Run the mock server --------
if (process.env.MOCK_SERVER) {
  require('./test/mock-server')
}
