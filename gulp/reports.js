'use strict';

const gulp = require('gulp');

gulp.task('reports', ['duplicate-report', 'sitespeed', 'html-validator-report', 'tslint-report', 'typedoc', 'accessibility', 'seo-report', 'pdl-report']);
