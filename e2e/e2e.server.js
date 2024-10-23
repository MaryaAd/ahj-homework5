const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');

const server = new WebpackDevServer(config.devServer, webpack(config));

server.startCallback(() => {
  console.log('Starting server on port 8087');
  if (process.send) {
    process.send('ok');
  }
});
