---
title: HTTP协议相关知识点
date: 2019-02-13 18:00:00
tags:
    - 非学前端

categories:
    - 学习
---

浏览器地址栏输入 `https://blog.unofficial.cn` ，经过短暂等待后看到内容展示出来，这个短暂等待过程发生了什么事情？

## HTTP请求？
* 请求行
    ```
    GET / HTTP/1.1
    GET         : 请求方法（GET / POST / HEAD / PUT / DELETE / TRACE / OPTIONS / CONNECT）
    /           : URI
    HTTP/1.1    : 协议和协议的版本
    ```
* 请求头
    ```
    Host : blog.unofficial.cn
    User-Agent : Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
    Accept : text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Referer : https://blog.unofficial.cn/
    Accept-Encoding : gzip, deflate, br
    Accept-Language : zh-CN,zh;q=0.9,en;q=0.8
    ...
    ```
* 空行
* 请求数据
    ```
    query1=hello&query2=world
    ```

## HTTP响应？
* 状态行
    ```
    HTTP/1.1 200 OK
    HTTP/1.1    : 协议和协议的版本
    200         : 状态码
    OK          : 状态消息
    ```
* 消息报文
    ```
    X-Powered-By: Express
    access-control-allow-origin: *
    Accept-Ranges: bytes
    Content-Type: text/html; charset=UTF-8
    Content-Length: 295
    ETag: W/"127-fXs5xfsR8E2y0OKYDm4nCzzWALY"
    Vary: Accept-Encoding
    Date: Wed, 13 Feb 2019 03:44:12 GMT
    Connection: keep-alive
    ```
* 空行
* 响应正文
    ```
    <!DOCTYPE html>
    ...
    ```

## HTTP状态码
1xx：指示信息--表示请求已接收，继续处理  
2xx：成功--表示请求已被成功接收、理解、接受  
3xx：重定向--要完成请求必须进行更进一步的操作  
4xx：客户端错误--请求有语法错误或请求无法实现  
5xx：服务器端错误--服务器未能实现合法的请求  

## 常见状态码
200 OK                          客户端请求成功  
400 Bad Request                 客户端请求有语法错误，不能被服务器所理解  
401 Unauthorized                请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用  
403 Forbidden                   服务器收到请求，但是拒绝提供服务  
404 Not Found                   请求资源不存在，eg：输入了错误的URL  
500 Internal Server Error       服务器发生不可预期的错误  
503 Server Unavailable          服务器当前不能处理客户端的请求，一段时间后可能恢复正常  

## HTTP缓存
* 协商缓存

* 强缓存

## 参考资料
https://www.cnblogs.com/zhuoqingsen/p/9456787.html
https://developers.google.com/web/fundamentals/performance/http2/