'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');


/**
 * param
 * 1. css
 * 2. js
 * 
 */

// 资源目录
let assets = './';

// css目录
let sassPath = assets + 'scss/*.scss';
let cssSrc = assets + 'scss/style.scss';
let cssDest = assets + 'css'

// js目录
let jsSrc = assets + 'js/es6/*.js';
let jsDest = assets + 'js';


// sass
gulp.task('sass', function() {

	// scss -> css
	gulp.src(cssSrc)
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest(cssDest));

})

// auto watch sass
gulp.task('sass:watch', function() {

	gulp.watch(sassPath, ['sass']);
})

// js
gulp.task('js', function() {

	// es6 -> es5
	gulp.src(jsSrc)
		.pipe()
		.pipe(gulp.dest(jsDest));
})

// tast -> default
gulp.task('default', ['sass', 'sass:watch'])