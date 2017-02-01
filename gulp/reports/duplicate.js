'use strict';

const gulp  = require('gulp'),
  shell = require('gulp-shell');

gulp.task('duplicate', shell.task([
  'mkdirp report/duplicate',
  'jscpd --reporter json --output report/duplicate/jscpd-report.json'
]));

gulp.task('duplicate-report', ['duplicate'], function (cb) {
  const report = require('./duplicate/report');
  report(cb);
});
