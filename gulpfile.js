//
// Gulpfile for Airconf-2014-Knockout
//
var gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('default', function() {
  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      port: 2014
    }));
});
