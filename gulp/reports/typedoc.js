'use strict';

const gulp = require('gulp');

gulp.task('typedoc', function() {
  const typedoc = require('gulp-typedoc');

  return gulp.src(['src/**/*.ts', '!src/*.ts', '!src/**/*.spec.ts', '!src/**/*.ignore.ts'])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'es6',
      out: 'report/docs/',
      name: 'Reference Application',
      ignoreCompilerErrors: true
    }));
});
