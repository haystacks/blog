'use strict';
let gulp = require('gulp'),
	babel = require('gulp-babel'),
	sass = require('gulp-sass'),
	cssBase64 = require('gulp-css-base64'),
	cdn = require('gulp-cdnizer'),
	browserSync = require('browser-sync').create();

// some param
let cdnBase = '//192.168.0.4:3000/';

// sass
gulp.task('sass', () => {
	gulp.src('./css/sass/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssBase64({
			maxWeightResource: 600,
			extensionsAllowed: ['.gif', '.jpg', '.png']
		}))
		.pipe(cdn({
			defaultCDNBase: cdnBase,
			relativeRoot: 'css/',
			files: ['**/*.{gif,png,jpg,jpeg}']
		}))
		.pipe(gulp.dest('./css'));

	gulp.watch(['./css/sass/style.scss'], ['sass']);
});

// babel es6
gulp.task('es6', () => {
	gulp.src('script/app/parts/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('script'));

	gulp.src('script/app/parts/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('script/app'));

	gulp.watch(['script/app/parts/main.js', 'script/app/parts/*.js'], ['es6']);
})

gulp.task('browser-sync', function() {
	browserSync.init({
		server: true,
		open: false
	});

	gulp.watch(['*.html', 'script/app/*.js']).on('change', browserSync.reload);
});

gulp.task('default', () => {
	gulp.start('browser-sync', 'sass', 'es6');
});
