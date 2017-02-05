'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');


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
	gulp.src(sassPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest(cssDest));

})

// auto watch sass
gulp.task('sass:watch', function() {

	gulp.watch(sassPath, ['sass']);
})

// tast -> default
gulp.task('default', ['sass', 'sass:watch'])