'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
// tast -> default
gulp.task('default', function() {

	// scss -> css
	gulp.src('./assets/scss/reset.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./assets/css'));

})