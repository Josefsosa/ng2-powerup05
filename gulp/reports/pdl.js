const gulp  = require('gulp'),
  shell = require('gulp-shell'),
  path = require('path'),
  options = require('../utils/profile').getOptions();

gulp.task('pdl', ['generate-states', 'server:reports'], shell.task(
  'phantomjs ' + path.join('.', 'gulp', 'reports', 'pdl', 'routes.js') + ' "' + options.serverUrl.substring(0, options.serverUrl.length - 1) + '"'
));

gulp.task('pdl-report', ['pdl'], function (cb) {
  const report = require('./pdl/report');
  report(cb);
});
