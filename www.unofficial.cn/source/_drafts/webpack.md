---
title: webpack
date: 2016-12-26
categories: 
- 学习
tags:
- webpack
---
之前也参考官方文档简单的玩过，但是直接找不到合适的项目使用，渐渐的也就遗忘了，由于最近准备学习vue，按照学习套路，开始再次学习一下，做一个简单的总结，方便以后查阅。  
<!-- more -->
### webpack是什么
webpck 是一个web项目模块打包工具，它可以把各种有依赖关系的模块或者资源打包成静态资源文件。  

#### 安装
```
npm install webpack -g
```

### 如何打包？
webpack支持非模块化以及Commonjs/amd等规范模块进行打包。  
![how it works](/assets/imgs/20161226/how-it-works.png)
#### 非模块化
app.js
```
console.log('hello world!');
```
command-line
```
// 命令行模式打包，只是一个非模块化（入口）文件打包
webpack app.js bundle.js
```
bundle.js （-p）
```
!function(o){function r(t){if(e[t])return e[t].exports;var n=e[t]={exports:{},id:t,loaded:!1};return o[t].call(n.exports,n,n.exports,r),n.loaded=!0,n.exports}var e={};return r.m=o,r.c=e,r.p="",r(0)}([function(o,r){console.log("hello world!")}]);
```
开发者模式打包出的文件是自执行函数，传入的是一个由模块组成的数组。  
```
(function(modules) {
	
})([
	function(module, exports) {
		console.log('hello world!');
	}
])
```

#### Commonjs

#### AMD
https://segmentfault.com/a/1190000000733959
#### ES6

### 参考资料
- [webpack.github.io/docs/what-is-webpack.html](//webpack.github.io/docs/what-is-webpack.html)
- [webpack.toobug.net/zh-cn/](//webpack.toobug.net/zh-cn/)