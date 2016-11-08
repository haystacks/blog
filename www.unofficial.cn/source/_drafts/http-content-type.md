---
title: HTTP中的Content-Type知识点学习
date: 2016-11-08
categories:
- 学习
tags:
- http
---

知识点是一个接着一个的，随着问题的发现，一个个的深挖下来，发现好多知识点不会。对于普通表单提交，我们的数据类型是什么，对于上传文件我们的类型又应该是什么。此文就是学习这个知识点的。  
<!-- more -->
### 如何提交一个表单
一个简单的不能再简单的登录窗口  
```
    <form action="//localhost/test/content-type.php" method="get">
        <p>用户中心</p>
        <div>
            <input type="text" name="username" placeholder="请输入用户名">
        </div>
        <div>
            <input type="password" name="password" placeholder="请输入密码">
        </div>
        <div>
            <button type="submit">登录</button>
        </div>
    </form>
```
如果method方式为get方式，提交表单传递参数通过URL传参，内容始终会使用urlencoded进行编码，即始终使用的是 `application/x-www-form-urlencoded` 进行编码。  

- application/x-www-form-urlencoded 
如果method方式为post方式，默认情况下enctype的值为 `application/x-www-form-urlencoded` ，在发送到服务器前都会进行编码（空格转换为+号，特殊符号转换为ASCII HEX值）  
列子:  
```
    // source
    username=wu+fei&password=%23123456
    // parse
    username:wu fei
    password:#123456
    // urlencoded
    username:wu+fei
    password:%23123456
```
PHP中可以直接使用$_POST或者$_REQUEST来获取表单数据  
[扩展学习ASCII HEX（urlencoded/urldecoded）](/2016/11/08/urlencoded-urldecoded.html)  

- text/plain
纯文本类型


列下不详细清单后续完善：  

- [预请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#预请求)。在chrome中的http的[timing](https://segmentfault.com/q/1010000002399481)  
- form表单默认enctype是application/x-www-form-urlencoded，XMLHttpRequest是text/plain，http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

- https://segmentfault.com/a/1190000003002851

### 参考资料
- https://html.spec.whatwg.org/multipage/forms.html#text/plain-encoding-algorithm