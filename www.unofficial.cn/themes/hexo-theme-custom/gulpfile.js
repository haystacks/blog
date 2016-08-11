'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
// let base64 = require('gulp-base64');

/**
 * param
 * 1. css
 * 2. js
 * 
 */

// 资源目录
let assets = './source/assets';

// css目录
let sassPath = assets + '/scss/*/*.scss';
let homeSrc = assets + '/scss/home.scss';
let styleSrc = assets + '/scss/style.scss';
let cssDest = assets + '/css'

// js目录
let jsSrc = assets + '/js/es6/*.js';
let jsDest = assets + '/js';


// sass 	css
// clean 	css
// base64	img 	css
gulp.task('sass', function() {

	// scss -> css
	gulp.src([homeSrc, styleSrc])
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		// .pipe(base64({
		// 	baseDir: __dirname.assets,
		// 	extensions: ['png', 'jpg'],
		// 	maxImageSize: 10*1024, // bytes 
		// 	debug: true
		// }))
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