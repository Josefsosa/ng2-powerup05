'use strict';

const gulp = require('gulp');
let taskCounter = 0,
  server;

function startServer() {
  const connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    compression = require('compression'),
    history = require('connect-history-api-fallback'),
    options = require('./utils/profile').getOptions(),
    app = connect();

  app.use(compression());
  app.use(history());
  app.use(serveStatic('dist', {
    cacheControl: true,
    maxAge: 31536000000
  }));
  server = http.createServer(app).listen(options.localServer.port);
}

function stopServerOnFinish() {
  let iteration = 0,
    interval;

  interval = setInterval(() => {
    if (taskCounter === 0 && iteration >= 1) { // second iteration
      if (server) {
        server.close();
      }
      clearInterval(interval);
    } else if (taskCounter === 0) {
      iteration++; // increase iteration
    } else {
      iteration = 0; // reset iterations
    }
  }, 1000);
}

gulp.task('server:reports', ['webpack'], () => {
  const options = require('./utils/profile').getOptions();
  if (options.localServer.enabled) {
    startServer();
    stopServerOnFinish();
  }
});

gulp.task('server:dist', ['webpack'], () => {
  startServer();
});

/* Gulp Task Listeners */

gulp.on('task_start', () => {
  taskCounter++;
});

gulp.on('task_stop', () => {
  taskCounter--;
});

gulp.on('task_err', () => {
  taskCounter--;
});
