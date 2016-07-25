/**
 * hexo-theme-custom gulpfile
 * 感谢一些工具插件提供帮助
 * @gulp https://github.com/gulpjs/gulp 自动化构建工具
 * @gulp-sass https://github.com/dlmanning/gulp-sass sass插件
 * @gulp-minify-css https://github.com/murphydanger/gulp-minify-css css压缩插件
 */
'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css');

/*sass->css->minify*/
gulp.task('minifySass', function () {
    gulp.src('./source/public/css/assets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./source/public/css/assets'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./source/public/css'));
});
gulp.task('minifySass:watch', function () {
    gulp.watch('./source/public/css/**/*.scss', ['minifySass']);
});

/*default*/
gulp.task('default', ['minifySass', 'minifySass:watch']);

/**
 * 一些其他可能会用到的插件
 * 自动添加css前缀（gulp-autoprefixer）
 * js代码校验（gulp-jshint）
 * 合并js文件（gulp-concat）
 * 压缩js代码（gulp-uglify）
 * 压缩图片（gulp-imagemin）
 * 自动刷新页面（gulp-livereload）
 * 图片缓存，只有图片替换了才压缩（gulp-cache）
 * 更改提醒（gulp-notify）
 */