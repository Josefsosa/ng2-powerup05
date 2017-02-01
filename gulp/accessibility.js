'use strict';

const gulp = require('gulp'),
  path = require('path'),
  shell = require('gulp-shell');


gulp.task('pally', ['generate-states', 'server:reports'], shell.task([
  'mkdirp report/pally',
  'node ' + path.join(__dirname, 'reports', 'accessibility', 'pa11y.js')
]));

gulp.task('accessibility', ['pally'], function (cb) {
  const dashboard = require('./reports/accessibility/dashboard');
  dashboard(cb);
});
