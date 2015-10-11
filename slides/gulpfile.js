// Gulpfile.js

var gulp = require('gulp');
var bower = require('gulp-bower');
var browserSync = require('browser-sync').create();

gulp.task('bower', function() {
  return bower({
    cmd: 'update'
  });
});

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});
