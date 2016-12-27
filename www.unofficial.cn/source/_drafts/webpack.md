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
Commonjs 是服务器语言规范，Nodejs就是使用的该规范。主要有两个关键字
- require 函数，导入依赖模块
- module.exports / exports 关键字，导出模块中的公共方法供使用

example1.2.js  
```
// 区分一下module.exports 与 exports，以下例子相等
module.exports = {
	hi: function() {
		console.log('hello world!');
	}
}
// exports 导出的对象只包含一个属性
exports.hi = function() {
	console.log('hello world!');
}
```

example1.1.js  
```
	const say = require('./example1.2');
	say.hi();
```
bundle1.1.js  
```
	(function(modules) {

	}([
		function(module, exports, __webpack_require__) {
			const say = __webpack_require__(1);
			say.hi();
		},
		function(module, exports) {
			exports.hi = function() {
				console.log('hello world!');
			}
		}
	]))
```

#### AMD
[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) 的全称是 Asynchronous Module Definition，中文直译的含义就是异步模块定义。AMD 是一个浏览器端模块化开发规范。  
- define 函数
  AMD 规范只是定义了一个 define 全局函数，按数描述为：  
  ```
  define(id?, dependencies?, factory);
  ```
  id （字符串）是定义的模块的名字，参数可选，没提供该参数时，模块的名字默认为模块加载器请求的指定脚本的名字，如果提  供了该参数，该参数必须是唯一的。  
  dependencies （数组）是定义的模块依赖的其他模块。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。  

例子：  
example2.2.js  
```
// 没有依赖，工厂函数直接是返回的一个对象
define([], function() {
	return {
		hi: function() {
			console.log('hello world!');
		}
	}
})
// 简化一下
define({
	hi: function() {
		console.log('hello world!');
	}
})
```
example2.1.js  
```
// 依赖 example2.2.js 
define(['./example2.2'], function(say) {
	say.hi();
})
```
webpack打包example2.1.js的模块时会自动根据依赖把example2.2.js一起打包  
```
webpack example2.1.js bundle2.1.js
```

bundle2.1.js
```
	(function(modules) {

	}([
		function(module, exports, __webpack_require__) {
			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
				__webpack_require__(1)
			], __WEBPACK_AMD_DEFINE_RESULT__ = function(say) {
				say.hi();
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
		},
		function(module, exports, __webpack_require__) {
			!(module.exports = {
				hi: function() {
					console.log('hello world!');
				}
			})
		}
	]))
```

#### UMD

#### ES6

### 进阶
#### command-line 模式
如果不使用其他参数，直接运行 `webpack` 默认会找配置文件 `webpack.config.js`，也可以自定义配置文件，`webpack --config config.js`，但是配置文件怎么写呢？  

```
module.exports = {
	// 配置项
}
```

#### API 模式
API 模式是将 webpack 作为模块来使用。  
```
const webpack = require('webpack');
webpack({
	entry: 'main.js',
	output: {
		filename: 'bundle.js'
	}
}, callback)
```

### 参考资料
- [webpack.github.io/docs/what-is-webpack.html](//webpack.github.io/docs/what-is-webpack.html)
- [webpack.toobug.net/zh-cn/](//webpack.toobug.net/zh-cn/)