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
var a = 123;
var bar = {
	b: function() {
		console.log(this.a); // undefined
	}
}
bar.b();
```

```
var a = 123;
var bar = {
	b: function() {
		console.log(this.a); // 123
	}
}
var b = bar.b;
b();
```

```
var bar = {
	a: 123,
	b: () => {
		console.log(this.a); // 123
	}
}
var b = bar.b;
b();
```
栗子不合适，还要重新修改才行