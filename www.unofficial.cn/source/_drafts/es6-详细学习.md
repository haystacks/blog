---
title: es6 详细学习
date: 2016-10-25
categories:
- 学习
tags:
- ES6
---
ES6规范出来也一年了，却始终不是那么认真的玩过，偶尔用一下部分ES6的写法，终究还是浏览器支持不足的原因，但是有工具babel，又有配置webpack的难度的在里面，也就一直搁置着。	
<!-- more -->
### let and const
在这之前，我们声明变量用的是 ` var ` ，现在又多了一个 ` let ` 和 ` const `。	
* 变量声明提升
```
	// var 变量提升
	console.log(bar);
	var bar = 123;

	// 提升后
	var bar;
	console.log(bar); // undefined
	bar = 123;

	// let 或者 const，不会变量提升
	console.log(bar, foo); // 参考错误，不能访问初始化之前的变量 bar。抛出错误了，foo的参考错误就没有提示 （ReferenceError: can't access lexical declaration `bar' before initialization）
	let bar = 1;
	const foo = 2;	
```

* 作用域
只有函数有自己的作用域，于是用了一个自执行函数。	
```
	var bar = 123;
	(function() {
		console.log(bar); // undefined
		var bar = 456;
	})()

	// var 不是块级作用域语句 

	if(true) {
		console.log(bar); // 123
		var bar = 456;
	}
	console.log(bar); // 456

	// let 与 const 是块级作用域语句
	let bar = 123; // error var 声明过bar了，不能再次声明
	// 或者const
	const bar = 123; // error 同理
```
let与const同名变量只能声明一次，都是块级作用域变量，let声明的变量可以重新赋值，const不能，const适合声明一个常量。	
但如果是这样的一种情况又是可行的	
```
	const bar = [];
	bar.push(123);
	console.log(bar); // [123]
```
如此是不是可以用 ` block `来替代 ` IIFE ` ，对于一下	
IIFE
```
(function() {
	var bar = 123;
}())
console.log(bar); // ReferenceError
```

Block
```
{
	let bar = 123;
}
console.log(bar); // ReferenceError
```

```
for(var i = 1; i < 6; i++) {
	(function(i) {
		setTimeout(function() {
			console.log(i); // 1, 2, 3, 4, 5
		}, 0)
	}(i))
}
```

```
for(let i = 1; i < 6; i++) {
	setTimeout(function() {
		console.log(i); // 1, 2, 3, 4, 5
	}, 0)
}
```

### arrow function
arrow function箭头函数，主要解决的问题就是 ` this `，在这之前有一个经典的问题。	
```
var bar = {
	fun: function() {
		console.log(this); // bar
	}
}
bar.fun();
```

// this所在的环境是bar对象中，this即指bar

```
var bar = {
	fun: () => {
		console.log(this); // window
	}
}
bar.fun();
```

// 箭头函数的this取决于上下文，上下文中的this是window
* 几种arrow function的写法
	* () => {} // 空函数
	* x => x * x // function(x) { return x * x; }
	* () => x * x
	* x => { x++; return x * x; }
	* () => { var x = 3; return x * x; }

### String
String新增两个方法 ` includes `， ` repeat `。	
` includes `判断一个字符串是否包含在另外一个字符串中，第一个参数是要检测的字符串，第二个参数是从什么位置开始。如果存在返回true，否在返回false。	
```
	'unofficial'.includes('official'); // true
	'unofficial'.includes('official', 3); // false
```
在这之前我们一直使用indexOf来判断是否存在返回下标，不存在返回-1。	
```
	'unofficial'.indexOf('hello'); // -1
	'unofficial'.indexOf('un'); // 0
```

` repeat `返回重复当前字符串多次的字符串	
```
	'unofficial'.repeat(3);
```
如果是以前的话需要自定义一个repeat方法。	
```
	function repeat(string, count) {
		// 创建一个容器数组
		var strings = [];
		while(strings.length < count) {
			strings.push(string);
		}
		return strings.join('');
	}
	repeat('unofficial', 3);
```
### Template literals
字符串模板字面量，在字符串中使用引号的问题可以不用再转义。	
```
// Old
var str = "你知道\"你好吗的意思\"？我不知道"; // 外单内双
var str = '你\'好\'吗？' // 你'好'吗？
// New
let str = `你知道\"你好吗的意思\"？我不知道`;
let str = `你'好'吗？`;
// 字符串中变量
// Old
const username = 'unofficial';
var str = '你是' +username+ '吗？';
// New
let str = `你是${username}吗？`;
```
### Destructuring
```
	// Array
	var arr = [1, 2, 3];
	var a = arr[0];
	var b = arr[1];
	var c = arr[2];

	// new
	let [a, b, c] = arr;

	// Object
	var obj = {a: 1, b: 2};
	var a = obj.a;
	var b = obj.b;

	// new
	let {a, b} = {a: 1, b: 2};
```
对象的解构赋值  
```
var {a, b} = {a: 1, b: 2};
console.log(a, b); // 1 2
// 用新变量赋值
var {a: foo, b: bar} = {a: 1, b: 2};
console.log(foo, bar); // 1 2
// 局部解构
var {b} = {a: 1, b: 2};
console.log(b, a); // ReferenceError a is not defined
// 默认值或者局部解构
var {a=123, b} = {a: 1, b: 2};
console.log(a, b); // 1 2
var {a=123, b} = {b: 2};
console.log(a, b); // 123 2
var {a=123, b=2} = {};
console.log(a, b); // 123 2
```
解构赋值，值存在是使用存在的值进行赋值，否则检查默认值，默认值不存在报错  
### Modules
 - AMD - Asynchronous Module Definition
 	- AMD - 异步模块定义规范
 	- require.js
 ```
define('foo', ['bar'], function () {
	return {
		method: function () {
			return 'food method result';
		}
	}
});
 ```
 - CommonJS
 	- nodejs
 ```
 	// foo.js 模块导出
 	module.exports = foo; // foo 可以是常量/数组/对象/函数
 	// 引入模块
 	const foo = require('foo');
 ```
 - ES6 Modules
 import 用于从外部模块/其他脚本中导入函数/对象/或者原型。这些导入的模型必须从其他的模块或者脚本中被导出。  
 	- 导入整个模块的内容
 	```
 		import * as myModule from "my-module";
 	```
 	- 导入模块的单个成员
 	```
 		import {myModuleMember} from "my-module";
 	```
 	- 导入模块的多个成员
 	```
 		import {foo, bar} from "my-module";
 	```
 	- 导入整个模块的内容，其中一些被显式命名。
	以下代码将myModule，foo，bar插入到当前作用域。注意，foo和myModule.foo是完全相同的，bar和myModule.bar也是如此。  
	```
		import myModule, {foo, bar} from "my-module";
		// myModule.foo === foo; myModule.bar === bar;
	```
	- 如果导入的成员的名称比较长或者不够简洁
	```
		import {myModuleMemberNameIsVeryLong as shortName} from "my-module";
	```
export 导出一个函数或者对象或者常量等，用于外部模型导入使用
	```
		export { myFun };
		export const foo = Math.PI * 3;
		export default myFunOrClass // import myFunOrClass from "my-module"
	```

### Parameters
- 参数默认值
```
	function addTwoNumber(x=0, y=0) {
		return x+y;
	}
	addTwoNumber(1, 2); // 3
	addTwoNumber(1); // 1
	addTwoNumber(); // 0
```
- 参数不确定
使用rest操作符，可以给函数传递一个不确定数量的参数列表  `…`

```
function log(...args) {
	for(let arg of args) {
		console.log(arg); // 1, 2, 3
	}
	console.log(arg);
}
log(1, 2, 3);
```
- 命名参数
```
function init({width=100, height=100}={}) {
	console.log(width, height);
}
init(); // 100 100
init({width: 100, height: 50}); // 100 50
```
相当于
```
({width=100, height=100}={});
let width = 100, height = 100;
{width, height} = {};
let width = width || 100, height = height || 100;
// 如果传入的有参数
{width, height} = {width: 100, height: 50};
// 解构得到的结果应该就是 100, 50
```
- 展开操作符
```
Math.max(...[2, 99, 6, 1002]); // 1002
```

### Classes
以前通过函数实现类的功能，通过原型扩展类。  
```
function User(name, blog) {
	this.name = name||'unofficial';
	this.blog = blog||'//blog.unofficial.cn/';
}
User.prototype.about = function() {
	var aboutme = '大家好，我是' + this.name + '，我的博客是"' + this.blog + '"。';
	return aboutme;
}
```
如果现在还有一个会员类需要继承父类User类。  
```
function Vip() {
	this.level = 1;
}
Vip.prototype = Object.create(User.prototype);
Vip.prototype.constructor = Vip;
```
在es6中添加了class的概念，但是它由于我们了解的其他的类的概念有一些差别，他只是一个语法糖，本质还是基于原型的面向对象。对于上面原型的类的重写一下就是，以下均在严格模式下执行  
```
'use strict';
class User {
	constructor(name, blog) {
		this.name = name||'unofficial';
		this.blog = blog||'//blog.unofficial.cn/';
	}

	about() {
		var aboutme = '大家好，我是' + this.name + '，我的博客是"' + this.blog + '"。';
		return aboutme;
	}
}
// 实例化
var user = new User('吴非');
console.log(user.about()); // 大家好，我是吴非，我的博客是"//blog.unofficial.cn/"。
```
对于 `class User{} ` 相当于就是 `User.prototype`   
```
User.prototype.constructor就是这里的constructor，构造函数指向函数本身
User.prototype.about对应类中的about方法
// 非严格模式下会提示User是undefined
// 严格模式下是
typeof User; // function
typeof User.prototype; // object
Object.keys(User.prototype); // []
console.log(User.prorotype);
/**
 * {
 	about: function,
 	constructor: function,
 	__proto__: Object
 * }
 */
Object.getOwnPropertyNames(User.prototype); // ['about', 'constuctor']
```


### Symbol

### Set and Map
Set: Set WeakSet
Map: Map WeakMap
	&keys
	 values
	 entries
	 foreach

### Proxy

### Reflect

### Promise

### Iterator

### Generator
