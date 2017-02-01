'use strict';

const webpack = require('webpack'),
  WebPackDevServer = require('webpack-dev-server'),
  clc = require('cli-color'),
  present = require('present'),
  process = require('process'),
  config = require('../../webpack.config.js');

module.exports = function server(port, callback) {
  const compiler = webpack(config),
    server = new WebPackDevServer(compiler, {
      quiet: true,
      inline: true,
      stats: {
        colors: true
      },
      historyApiFallback: true,
      contentBase: './src'
    }),
    serverStartTime = present();

  compiler.plugin('done', () => {
    let serverStartDuration = Math.round((present() - serverStartTime) / 10) / 100;
    console.log(clc.green('info: ') + 'Server initialized in ' + serverStartDuration + ' seconds.');

    callback((cb) => {
      server.close();
      process.exit();
    });

  });

  console.log(clc.green('info: ') + 'Starting server...');
  server.listen(port);
};
