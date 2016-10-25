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

	var bar = 123;
	if(true) {
		console.log(bar); // 123
		var bar = 456;
	}
```