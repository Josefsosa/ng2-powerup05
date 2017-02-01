'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('webpack-dev-server', shell.task([
  'webpack-dev-server --inline --progress --profile --colors --display-error-details --display-cached --dev'
]));

gulp.task('webpack:dev', shell.task([
  'webpack --inline --progress --profile --colors --display-error-details --display-cached'
]));

gulp.task('webpack', shell.task([
  'webpack --inline --progress --profile --colors --display-error-details --display-cached --prod'
]));
