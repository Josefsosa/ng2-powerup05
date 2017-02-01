/**
 * TODO: this is not the complexity report.
 * Currently this report is not working with complexity analyzer, because there is no exist a
 * complexity analyzer for typescript, so currently we are running a tslint
 */

'use strict';

const gulp = require('gulp'),
  shell = require('gulp-shell');


gulp.task('tslint', shell.task([
  'mkdirp report/tslint',
  'tslint --force --config "tslint.json" --format json --out report/tslint/tslint.json --exclude "src/vendor/**/*.ts" --exclude "src/**/*.spec.ts" "src/**/*.ts"'
]));

gulp.task('tslint-report', ['tslint'], function (cb) {
  const report = require('./tslint/report');
  report(cb);
});
