'use strict';

const gulp = require('gulp'),
  shell = require('gulp-shell');

gulp.task('test-automation', shell.task('protractor ./test/protractor-conf-e2e.js'));
