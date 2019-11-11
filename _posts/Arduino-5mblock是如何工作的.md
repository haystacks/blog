---
title: mblock是如何让Arduino工作的（中）
date: 2019-09-15 20:00:00
tags:
    - Arduino

categories:
    - 爱好
---

上一篇文章我们主要从 WEB IDE 作为入口简单分析了一下，Arduino 是如何与 IDE 连接上的，我们发现是与用户电脑本地的建立了 websocket 连接服务。通过本地的服务查询了串口列表，以及串口脚本写入，这个过程又是如何实现的呢？

<!-- more -->

## 分析系列

-   [mblock 是如何让 Arduino 工作的（上）](https://segmentfault.com/a/1190000020352814)

## mLink

Web 应用能够与 Arduino 一起工作，因为本地安装了一个应用 mLink ，是通过启动 mLink 在本地起了一个 websocket 服务。

### 发现应用

`系统盘 - 应用程序 - mLink（右键）- 显示包内容` 通过这个路径操作，我们可以看到应用的代码，`Resources` 目录下有一个项目目录 `robocomm-web`，看到这个项目就很熟悉了，一个 Node.js 应用。

![Local Server](https://i.loli.net/2019/09/15/PATdfZ3zlR68F2X.png)

### Local Server

Node.js 项目的入口是 package.json，通过这个入口我们可以看到项目有两个依赖包，`socket.io` 和 `serialport`，本地的 websocket 服务是通过 socket.io 创建的，对于 serialport 肯定是用来获取串口对应信息的一个包。

### 验证分析

为了验证整个分析过程是否正确，我们把 mLink 应用先关闭，这个应用本身还存在一个 Bug，关闭应用的时候本地的服务还是没有关闭。通过关口查找与进程杀死才能完全关闭。

```
# 端口查找
lsof lsof -i tcp:55278

# 进程杀死 下面的 PID 等于下图中的 31354
kill PID
```

![lsof](https://i.loli.net/2019/09/15/D25QOs1PTdb6YFR.png)

直接启动 Node.js 项目，看能不能正常工作。项目根目录直接执行命令

```
node app
```

## serialport

[serialport](https://github.com/serialport/node-serialport)，这是一个使用 JavaScript 访问串行端口的库。

### 如何使用

`serialport` 是所有功能（Stream Interface， Bindings，Parser streams）的集合，暂时先直接引入整个包来上一个简单的上手。

```javascript
// getDevice
const Serialport = require('serialport');
serialport.list().then(res => {}); // /dev/tty.Bluetooth-Incoming-Port /dev/tty.usbmodem14201

// connect
const comName = '/dev/tty.usbmodem14201';
const port = new SerialPort(comName);

// addEventListener
port.on('open', () => {});
port.on('data', () => {});
port.on('write', () => {});
port.on('error', () => {});
port.on('close', () => {});
port.on('drain', () => {});
```

上述操作基本都是通过参考项目代码以及官方文档大致了解了一下，还没有实现一个完整的 DEMO。后续文章还需要了解 mBlock 传入的 cmd 为 write 操作时传入的数据是什么？block 是如何转换成为数据的？传入的数据直接通过写操作就成功写入程序了吗？带着这些疑问下一篇文章我们后续继续深入学习实现一个自己的 link。

## 末了

本次通过分析 mLink ，我们主要认识了一个新的库 `serialport` ，通过 JavaScript 就能够获取串行端口。我们回顾一下前面学习到知识，了解到 `johnny-five` 能过获取到端口也是使用了 serialport。
