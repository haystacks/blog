---
title: fastclick double click
date: 2018-01-03 09:58:29
tags: fastclick
---
问君 bug 几时修？来不及了，去年的 bug 直接拖到了今年。反思后发现导致这个问题有两方面的原因：  
直接原因是对于层层包装后的框架认识不够，仅仅停留在业务层面，更多的问题框架已经帮忙解决了，留给业务开发的只是写写页面逻辑，这个过程直接影响了面对问题时的思考能力。  
间接原因是工具的缺乏，工欲善其事必先利其器，ios 优先的前提下，对于测试机以及开发调试环境都有明显的需求，这个时候一台 Mac ，一部 IPhone 就不再是所谓的装"X”了。
<!-- more -->
### 情景再现
为了充分理解问题的发现始末，我 1:1 的还原了案发现场。1:1 也只是所谓的 1:1，现场勘查后控制了主要嫌疑人 `fastclick`，现场证人 `vue` 等留着后续需要的时候再传唤。  

[模拟现场 demo ](/demo/fastclick/fastclick.html)

非 Safari 浏览器访问一切正常，所以访问以上 demo 建议使用手机版测试。  

### fastclick 是凶手吗
为了测试是由于 `fastclick`，我想到的最简单的办法是屏蔽对于 `fastclick` 的初始化，如下代码：  
```
    document.addEventListener(
        'DOMContentLoaded', 
        () => {
            FastClick.attach(document.body)
        }
    )
```
屏蔽了这段代码就把问题解决了，我是不是可以拿着这个铁证就去追凶 `fastclick` 了呢？很明显这个过程是疑问的，页面中仅仅是当前位置的点击事件存在问题。  

### 继续沿着头绪寻找证据
执行点击事件后打印出堆栈信息  
```
    fastclick.html:59 console.trace
    clickFunc @ fastclick.html:59
    onclick @ fastclick.html:43
    FastClick.sendClick @ fastclick.js:308
    FastClick.onTouchEnd @ fastclick.js:606
    (anonymous) @ fastclick.js:111
```
按照堆栈信息的提示，直接看 `fastclick.js` 的 111 行  
```
    // Some old versions of Android don't have Function.prototype.bind
    function bind(method, context) {
        return function() { return method.apply(context, arguments); };
    }
```
为不支持 `[Function.prototype.bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)` 的设备模拟了一个 this 的绑定。  
```
    var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
    var context = this;
    for (var i = 0, l = methods.length; i < l; i++) {
        context[methods[i]] = bind(context[methods[i]], context);
    }
```
