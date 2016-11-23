---
title: 同源策略和跨域知识点学习
tags:
  - 前端
categories:
  - 学习
date: 2016-11-01 00:00:00
---

问题起因是在使用weibo api的时候，发现有一个报错。weibo api是https协议，我本地是模拟的回调域名，然后进行数据通信，本地http协议，于是乎就报错了。出于对postMessage的不是很熟悉，借此机会学习完善一下自己的知识储备。  
<!-- more -->
```
api.weibo.com/2/oauth2/authorize?client_id=******&response_type=token&d…ansport=html5&referer=http://www.unofficial.cn/demo/vuejs/demo.html:1 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.unofficial.cn') does not match the recipient window's origin ('http://www.unofficial.cn').
```

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

#### 允许跨域写
表单提交，例如我模拟了一个表单提交到我的一个其它站点。  
同源策略主要限制的是不同源之间的交互操作，对于跨域内嵌的资源不受该策略限制。  

#### 允许跨域嵌入
- &lt;script src="……"></script> 标签嵌入脚本，语法错误信息只能在同源脚本中捕捉到（？）。
- &lt;link rel="stylesheet" href="……"> 标签嵌入css
- &lt;img src="" alt=""> 标签嵌入图片
- &lt;video></video> 和 <audio></audio> 标签嵌入多媒体资源
- @font-face 
- &lt;iframe src="……" frameborder="0"></iframe> 载入的任何资源。可以使用x-frame-options消息头来阻止这种形式的交互。

#### 不允许跨域读
> 需要注意的是，页面内的引入的文件的域并不重要，重要的是加载该文件的页面所在的域。例如说我在[博客](http://www.unofficial.cn/)的首页引入了 //cdn.bootcss.com/jquery/3.1.1/jquery.min.js 的jquery文件，这时 jquery.min.js 的源应该就是我的博客地址 http://www.unofficial.cn 。

### iframe
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

- 同源
iframe外部操作，主要通过contentDocument/contentWindow，iframe内部使用window.parent，如果只是嵌套了一层可以使用window.top，iframe多层嵌套可以使用window.frameElement  
```
    // 外部 -> 内

    var iframe = document.getElementsByTagName('iframe');
    // 举例第一个
    iframe[0].contentDocument.getElementById('test').innerText = 123;

    // 内部 -> 外
    window.parent.getElementById('test').innerText = 123;
```

- 跨域
如果需要在跨域的情况下传递参数怎么操作呢？  
iframe内部操作，主要通过 `location.hash`  
```
    // 外部传递一个123给内部
    var src = iframe[0].src;
    iframe[0].src = src.indexOf('#') != -1 ? src.split('#')[0].concat('#', 123) : src.concat('#', 123);
    // 然后内部监测hashChange，自动获取hash值

    // 内部更改hash
    window.location.hash = 123;
    // 但是如何外部如何监控src的变化呢？
```

### ajax
#### cors
同域可读可写，跨域请求不能检查到 Access-Control-Allow-Origin 的情况下会被拦截。  
```
    // www.unofficial.cn:4000
    // 跨域请求
    var url = "http://www.unofficial.cn/demo.php";
    var params = "lorem=ipsum&name=binny";

    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
```

> XMLHttpRequest cannot load http://www.unofficial.cn/demo.php. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://www.unofficial.cn:4000' is therefore not allowed access.


上面错误提示可以设置 `Access-Control-Allow-Origin` ，于是在header中添加设置即可实现跨域请求。  
#### options
- Access-Control-Allow-Origin
    origin参数指定一个允许向该服务器提交请求的URI.对于一个不带有credentials的请求,可以指定为'*',表示允许来自所有域的请求。  
    ```
    Access-Control-Allow-Origin: http://www.unofficial.cn
    ```

- Access-Control-Allow-Credentials
    它的值是一个布尔值，表示是否允许发送Cookie。默认是 `true` 允许的。 『实际测试没发现，也许是方法还不对吧。』  

- Access-Control-Expose-Headers
    设置浏览器允许访问的服务器的头信息的白名单。如果没有设置白名单的，默认情况下只能获取 `Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`的值，没设置返回 `null`，否则会得到以下提示：  

    > Refused to get unsafe header "X-Powered-By"

    例如：  
    ```
    // 服务端设置
    Access-Control-Expose-Headers: X-Powered-By
    ```

    前端可以这样获取到 `X-Powered-By` 的属性值  

    ```
        var http = new XMLHttpRequest();

        http.getResponseHeader('X-Powered-By'); // 
    ```

- Access-Control-Max-Age
    设置预请求时间。即是设置 `OPTION` 的时间。  

- Access-Control-Allow-Methods
    设置允许的请求方法。  

#### jsonp
cors的方式可以发起post请求，或者说其它形式的请求，但是jsonp只能使用get的方式获取数据。  
```
<script>
    function abc(data) {
        console.log(data);
    }abc('{"abc":"123"}');
</script>

<script src="http://www.unofficial.cn/test/demo.php?callback=abc"></script>
```

简单说就是定义好回调处理方法，把回调函数的名称传递给后端，后端拿到数据名称后返回会的数据就是对于回调方法的执行。  
```
<script src="http://www.unofficial.cn/test/demo.js"></script>
/**
 * demo.js的内容
 * abc({"abc":"123"});
 */
```

### 什么是postMessage
postMessage是window对象的一个属性，widow.postMessage是一个安全的跨源通信协议。当且仅当执行脚本的页面使用相同的协议（通常都是 http）、相同的端口（http默认使用80端口）和相同的 host（两个页面的 document.domain 的值相同）时，才允许不同页面上的脚本互相访问。 window.postMessage 提供了一个可控的机制来安全地绕过这一限制，当其在正确使用的情况下。  

- iframe的情况下我们可以这样使用，等待页面加载结束时传参数到指定源。  
    ```
    // localhost ① pm1.html页面中存在一个跨域iframe引用
    <iframe src="//www.unofficial.com/demo/postMessage/pm2.html" frameborder="0"></iframe>
    <script>
        window.onload = function() {
            window.frames[0].postMessage('some messages', '*'); // * 跨域是固定的targetOrigin(必须指明协议、主机名、端口) http://www.unofficial.com
        }
    </script>

    // www.unofficial.cn pm2.html中我们跨域监听 `message` 获取 `postmessage` 传过来的数据。  
    <script>
        window.addEventListener('message', function(event) {
            if(event.origin.test('//localhost/')) {
                console.log(event.data);
            }
        })
    </script>
    ```

- window.open的情况下就需要特殊处理一下了
    ```
    // localhost ② window.open
    <script>
        function openAPage() {
            // 同源的情况下可以判断页面是否加载结束
            var openPage = window.open('//localhost/demo/postMessage/pm2.html');
            openPage.onload = function() {
                openPage.postMessage('some messages', '*');
            }
            // 不同源的情况下，使用setTimeout或者setInterval
            var openPage = window.open('//www.unofficial.com/demo/postMessage/pm2.html');
            setTimeout(function() {
                openPage.postMessage('some messages', '*');
            }, 0)
        }
    </script>
    ```

    延迟多长时间执行？页面加载时间是多长，这个不是很好判断，setTimeout需要略估计一个时间，待open的页面加载完成了再postMessage（应该不比完全加载就可以postMessage了）。要不然就是定时器，定时推一次，直接触发事件后使用window.opener取消定时器。  

### 总结
问题基本都是在过程中发现一个学习一个，对于没有太多场景的学习，只能这样慢慢积累。  

### 参考资料
- https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy