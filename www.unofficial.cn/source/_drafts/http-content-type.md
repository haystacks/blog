---
title: HTTP中的Content-Type知识点学习
date:
categories:
tags:
---

知识点是一个接着一个的，随着问题的发现，一个个的深挖下来，发现好多知识点不会。对于普通表单提交，我们的数据类型是什么，对于上传文件我们的类型又应该是什么。此文就是学习这个知识点的。  
<!-- more -->
列下不详细清单后续完善：  

- [预请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#预请求)。在chrome中的http的[timing](https://segmentfault.com/q/1010000002399481)  
- form表单默认enctype是application/x-www-form-urlencoded，XMLHttpRequest是text/plain，http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

- https://segmentfault.com/a/1190000003002851