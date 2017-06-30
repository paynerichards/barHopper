var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('watch', function(){
	gulp.watch(['./server/public/styles/style.less'], ['compile-less'])
})

gulp.task('compile-less', function(){
	gulp.src('./server/public/styles/style.less')
	.pipe(less())
	.pipe(gulp.dest('./server/public/styles'))
})

gulp.task('default', ['compile-less', 'watch'])