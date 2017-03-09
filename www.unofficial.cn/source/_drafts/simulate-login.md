---
title: simulate login
date:
categories:
tags:
---

<!-- more -->
```
function touchstart(x, y, number) {
  var touch = new Touch({
    identifier: number,
    target: document.querySelector('#username'), //随便设置的
    clientX: x,
    clientY: y
  });
  console.log('touchstart环境 x:' + x, 'y:' + y);
  var event = new TouchEvent('touchstart', {
    touches: [touch],
    targetTouches: [touch],
    changedTouches: [touch],
  });
  console.log(event);
  document.querySelector('#username').dispatchEvent(event); //touchstart
}


function creatTouchstartEventAndDispatch (el) { 
    var event = document.createEvent('Events');
    event.initEvent('touchstart', true, true); 
    el.dispatchEvent(event); 
} 

```
