'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');


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

// eslint js
gulp.task('eslint', function() {
	return gulp.src([jsSrc,'!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
})

// auto watch js
gulp.task('eslint:watch', function() {
	gulp.watch(jsSrc, ['eslint']);
})

// tast -> default
gulp.task('default', ['sass', 'sass:watch', 'eslint', 'eslint:watch'])