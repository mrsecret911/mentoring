var gulp = require('gulp');
var connect = require('gulp-connect');;

gulp.task('connect', function() {
  connect.server({
  	root: 'public'
  });
});


gulp.task('default', function() {
  // place code for your default task here
});