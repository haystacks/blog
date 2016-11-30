---
title: Object 对象学习 
date: 2016-11-24 20:53:10
categories:
- 学习
tags:
- Object
---

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

<!-- more -->
### Object.defineProperty
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

#### 概念解释
语法：
> Object.defineProperty(obj, prop, descriptor)

obj：需要定义属性的对象，最后 `Object.defineProperty` 的返回值就是该对象
prop：需要为obj定义的属性名
descriptor：属性的描述符对象，其中包含几个参数

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。

+ 数据描述符与存取描述符都可以拥有的可选属性
	- configurable：配置。只有当该属性的值为 true 的时候，该属性的值才能被修改，或者被删除（默认false）
	- enumerable：枚举。只有当该属性的值为 true 的时候，该属性的值才能被遍历（默认为false）

+ 只有数据描述符才能同时拥有的可选属性  
	- value：属性值，可以是 javascript 任意类型的值（默认undefined）
	- writable：可写。只有当该属性的值为 true 的时候，该属性才能通过赋值运算符赋值（默认false）

+ 只有存取描述符才能同时拥有的可选属性  
	- get：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
	- set：一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。方法将接受唯一参数，并将该参数的新值分配给该属性。。默认为 undefined。

#### 代码解释
- configurable, enumerable, value, writable的默认值分别为false, false, undefined, false。获取descriptor描述符对象的值可以使用[Object.getOwnPropertyDescriptor(object, prop)](#Object-getOwnPropertyDescriptor)方法。
```
var obj = {},
	descriptor = {};
var someObj = Object.defineProperty(obj, 'a', descriptor);
console.log(Object.getOwnPropertyDescriptor(someObj, 'a'));
// 得到的结论是以下这个Object
// Object {value: undefined, writable: false, enumerable: false, configurable: false}
```

- configurable
```
/*
 * 情形一
 * configurable: false
 */
var obj = {},
	descriptor = {
		value: 1
	};
Object.defineProperty(obj, 'a', descriptor);
console.log(obj); // Object {a: 1}
// modify（修改）
Object.defineProperty(obj, 'a', {value: 2}); // Uncaught TypeError:Cannot redefine property: a
obj.a = 2;
// delete
delete obj.a; // 返回false；严格模式（'use strict';）下抛出错误  

// 情形二 configurable 为true
var obj = {},
	descriptor = {
		value: 1,
		configurable: true
	};
Object.defineProperty(obj, 'a', descriptor);
console.log(obj); // Object {a: 1}
Object.defineProperty(obj, 'a', {value: 2});
console.log(obj); // Object {a: 2}
delete obj.a; // true
```

- enumerable
```
/*
 * 情形一
 * enumerable: false
 */
var obj = {},
	descriptor = {
		value: 1
	};
Object.defineProperty(obj, 'a', descriptor);

for(var i in obj) {
	console.log(i);
}
// 不会获得任何输出  

/*
 * 情形二
 * configurable: true
 */
var obj = {},
	descriptor = {
		value: 1,
		enumerable: true
	};
Object.defineProperty(obj, 'a', descriptor);

for(var i in obj) {
	console.log(i);
}
// a
```

- writable
```
/**
 * 情形一
 * writable: false
 */
var obj = {},
	descriptor = {
		value: 1
	};
Object.defineProperty(obj, 'a', descriptor);
obj.a = 2;
console.log(obj); // Object {a: 1}

/**
 * 情形二
 * writable: true
 */
var obj = {},
	descriptor = {
		value: 1,
		writable: true
	};
Object.defineProperty(obj, 'a', descriptor);
Object.defineProperty(obj, 'a', {value: 2});
console.log(obj); // Object {a: 2}
obj.a = 3;
console.log(obj); // Object {a: 3}
```

- configurable vs writable
```
/**
 * configurable 为true的时候可以修改并且删除值
 * writable 为true的时候可以修改但是不能删除值
 */

var obj = {},
	descriptor = {
		value: 1,
		configurable: true
	};
Object.defineProperty(obj, 'a', descriptor); // Object {a: 1}
Object.defineProperty(obj, 'a', {value: 2}); // Object {a: 2}
Object.getOwnPropertyDescriptor(obj, 'a');  // Object {value: 2, writable: false, enumerable: false, configurable: true}
delete obj.a; // true
console.log(obj); // Object {}

var obj = {},
	descriptor = {
		value: 1,
		writable: true
	};
Object.defineProperty(obj, 'a', descriptor); // Object {a: 1}
Object.defineProperty(obj, 'a', {value: 2}); // Object {a: 2}
Object.getOwnPropertyDescriptor(obj, 'a');  // Object {value: 2, writable: true, enumerable: false, configurable: false}
delete obj.a; // false
console.log(obj); // Object {a: 1}
```

- get and set
```
/**
 * 存储描述符，get:对象的属性被访问的时候，就会默认调用get方法，如果没有设置值，默认值为undefined，set:对象的属性被赋值的时候，就会默认调用set方法，如果没有设置值，默认值也为undefined
 */
var value,
	obj = {},
	descriptor = {
		get: function() {
			return value;
		},
		set: function(val) {
			value = val;
		}
	};
Object.defineProperty(obj, 'a', descriptor);
console.log(obj); // Object {a: undefined, get a: function, set a: function}
obj.a = 1; // obj对象的属性a就行赋值操作，调用set方法，对value进行赋值。
console.log(obj); // Object {a: 1, get a: function, set a: function}
```

### Object.getOwnPropertyDescriptor

### prototype 和 property
英语不是很好的我总是容易弄不清楚这两个单词的意思，总是写错，特意拿出来区分一下
protorype：原型
property：属性