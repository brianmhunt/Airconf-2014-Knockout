//
// Gulpfile for Airconf-2014-Knockout
//
var gulp = require('gulp');
var connect = require('gulp-connect');
var options = {
  root: 'src',
  livereload: true,
  port: 2014
};

gulp.task('connect', function() {
  gulp.task('connect', function () {
    connect.server(options)
  });
});

gulp.task('src', function () {
  gulp.src('./src/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/*'], ['src']);
});

gulp.task('default', ['connect', 'watch']);
