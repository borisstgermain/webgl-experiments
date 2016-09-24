'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const Cache = require('gulp-file-cache');
const cache = new Cache();


gulp.task('build', ['backend-prod']);


gulp.task('watch', ['backend-dev'], () => {
  gulp.watch('./src/backend/**/*.js', ['backend-dev']);

  nodemon({
    execMap: {
      js: 'node'
    },
    script: './app/index.js',
    ignore: [
      'node_modules/',
      'app/public/'
    ],
    watch: ['app/'],
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
  }).on('restart', () => {
    console.log('Restarted!');
  });

  return nodemon;
});


gulp.task('backend-prod', () => {
  return gulp
    .src('./src/backend/**/*.js', { base: './src/backend' })
    .pipe(babel())
    .pipe(gulp.dest('app/'));
});


gulp.task('backend-dev', () => {
  return gulp
    .src('./src/backend/**/*.js', { base: './src/backend' })
    .pipe(cache.filter())
    .pipe(plumber())
    .pipe(babel())
    .pipe(cache.cache())
    .pipe(gulp.dest('app/'));
});
