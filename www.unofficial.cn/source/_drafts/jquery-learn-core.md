---
title: jQuery 核心部分学习 （core）
date: 2017-02-03 10:38:46
categories:
- 学习
tags:
- jQuery
---

入口文件 **jQuery.js** 中首先引人的模块就是本文需要学习的部分 **core**。
<!-- more -->

core 中引入了 ** arr, document, getProto, slice, concat, push, indexOf,
	class2type, toString, hasOwn, fnToString, ObjectFunctionString,
	support, DOMEval ** 等模块。接下来学习的时候在使用的时候再分别进行单个学习，直接开始后续部分学习。  

### 结构梳理

- "use strict" 严格模式
- 常量定义
version: jQuery 的版本号
jQuery: 定义了一个本地副本jQuery

```
var jQuery = function( selector, context ) {
    return new jQuery.fn.init( selector, context );
}
```
我有一个疑问，fn 是什么？继续往下会得到  

```  
jQuery.fn = jQuery.prototype = {
    ……
};
```
在 /core/init.js 中初始化了一个 jQuery 对象
```
var init = jQuery.fn.init = function( selector, context, root ) {
    ……
}
```

我又有一个疑问，为什么 init.prototype = jQuery.fn; ？


### 知识点学习
http://naotu.baidu.com/file/76fcf5101a84f7521d843d06df38dc24
