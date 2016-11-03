---
title: postMessage
date:
categories:
tags:
---
问题起因是在使用weibo api的时候，发现有一个报错。weibo api是https协议，我本地是模拟的回调域名，然后进行数据通信，本地http协议，于是乎就报错了。出于对postMessage的不是很熟悉，借此机会学习晚上一些自己的知识储备。  
```
api.weibo.com/2/oauth2/authorize?client_id=2199529438&response_type=token&d…ansport=html5&referer=http://unofficial.sinaapp.com/demo/vuejs/demo.html:1 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://unofficial.sinaapp.com') does not match the recipient window's origin ('http://unofficial.sinaapp.com').
```
<!-- more -->
### 同源策略
在这之前需要先熟悉一下这个概念，同源指请求协议相同，主机名相同，端口相同，涉及安全的策略。  
```
    // 例如我的博客地址
    http://www.unofficial.cn/demo/postMessage/pm1.html      同
    http://www.unofficial.cn/demo/vuejs/index.html          同
    https://www.unofficial.cn/demo/postMessage/pm1.html     不同 协议不同
    http://blog.unofficial.cn/demo/postMessage/pm1.html     不同 主机名不同
    http://www.unofficial.cn:8080/demo/postMessage/pm1.html 不同 端口不同
```
- 允许跨域写
表单提交，例如我模拟了一个表单提交到我的一个其它站点。  

同源策略主要限制的是不同源之间的交互操作，对于跨域内嵌的资源不受该策略限制。
- 允许跨域嵌入
    - &lt;script src="……"></script> 标签嵌入脚本，语法错误信息只能在同源脚本中捕捉到（？）。
    - &lt;link rel="stylesheet" href="……"> 标签嵌入css
    - &lt;img src="" alt=""> 标签嵌入图片
    - &lt;video></video> 和 <audio></audio> 标签嵌入多媒体资源
    - @font-face 
    - &lt;iframe src="……" frameborder="0"></iframe> 载入的任何资源。可以使用x-frame-options消息头来阻止这种形式的交互。

- 不允许跨域读

> 需要注意的是，页面内的引入的文件的域并不重要，重要的是加载该文件的页面所在的域。例如说我在[博客](http://www.unofficial.cn/)的首页引入了 //cdn.bootcss.com/jquery/3.1.1/jquery.min.js 的jquery文件，这时 jquery.min.js 的源应该就是我的博客地址 http://www.unofficial.cn 。  

- 常见跨域问题
    - iframe
    同域可读可写，跨域可读不可写
    ```
    // 请求地址：//www.unofficial.cn/demo/postmessage/pm2.html
    <iframe src="pm2.html" frameborder="0"></iframe>
    <iframe src="//blog.unofficial.cn/demo/postmessage/pm2.html" frameborder="0"></iframe>
    <script>
        window.onload = function() { // 必须等待文档加载结束才能获取
            var iframe = document.getElementsByTagName('iframe');
            console.log(iframe[0].contentDocument); // 同源
            console.log(iframe[1].contentDocument); // 不同源
        }
    </script>
    // 不同源时使用contentWindow/contentDocument报错
    // pm1.html:12 Uncaught DOMException: Failed to read the 'contentDocument' property from 'HTMLIFrameElement': Blocked a frame with origin "http://www.unofficial.cn" from accessing a cross-origin frame.(…)

    ```
    如果需要在跨域的情况下传递参数怎么操作呢？  
    可以理解的是
    - ajax
    同域可读可写，跨域请求不能检查到 Access-Control-Allow-Origin 的情况下会被拦截。  
```
    /**
     * localhost:80/postmessage/pm1.html
     * localhost:80/postmessage/pm2.html
     */


```
### 什么是postMessage
postMessage是window对象的一个属性，widow.postMessage是一个安全的跨源通信协议。当且仅当执行脚本的页面使用相同的协议（通常都是 http）、相同的端口（http默认使用80端口）和相同的 host（两个页面的 document.domain 的值相同）时，才允许不同页面上的脚本互相访问。 window.postMessage 提供了一个可控的机制来安全地绕过这一限制，当其在正确使用的情况下。  



### 参考资料
- https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy
- https://github.com/hawx1993/Front-end-Interview-questions
- http://louiszhai.github.io/2016/01/11/cross-domain/