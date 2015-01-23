var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    bump = require('gulp-bump'),
    notify = require('gulp-notify'),
    git = require('gulp-git'),
    size = require('gulp-size'),
    pkg = require('./package.json');

var paths = {
  src: ['./src/*.js']
};

var sourceMin = 'angular-auth.min.js';

gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('build', ['lint'], function() {
  return gulp.src(paths.src)
    .pipe(uglify())
    .pipe(concat(sourceMin))
    .pipe(size())
    .pipe(gulp.dest('dist'))
    .pipe(notify('Build finished'));
});

gulp.task('bump', function () {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: gulp.env.type}))
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function () {
  return gulp.src('./')
    .pipe(git.commit('Version '+pkg.version))
    .pipe(git.tag(pkg.version, 'Version '+pkg.version))
    .pipe(git.push('monkee', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});
