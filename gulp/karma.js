'use strict';

const gulp = require('gulp'),
  path = require('path');

gulp.task('karma', function (done) {
  let Server = require('karma').Server,
    karma = new Server({
    configFile: path.resolve('test/karma.conf.js'),
    autoWatch: false,
    failOnEmptyTestSuite: false,
    singleRun: true,
    background: false
  }, function () {
    done();
  });
  karma.start();
});

gulp.task('test-report', ['karma'], function (done) {
  const report = require('../test/report'),
    process = require('process');

  setTimeout(function () {
    report(() => {
      done();
      process.exit(); // hack to stop the process on time
    });
  }, 2000);
});

gulp.task('test', ['test-report'], () => {});
