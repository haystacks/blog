---
title: mblock是如何让Arduino工作的（上）
date: 2019-09-10 21:00:00
tags:
    - Arduino

categories:
    - 爱好
---

从官网原版 DEMO 到 用熟悉的语言来写 DEMO ，如何用更容易让小朋友理解的方式来实现这个 DEMO 呢？今天开始陆续研究这整个过程如何实现。
在这之前了解过一些方案，例如 s4a 等一些其它方案，没有深入了解，从界面等方面来看基本都是基于 Scratch 2 来做的开发，Scratch 3 优化的更漂亮些来，有没有基于 Scratch 3 的解决方案呢？本文暂时以自己看到的内容加上自己的理解，后续按照实际的研究情况更新。

![Arduino code by block](https://i.loli.net/2019/09/10/wVnyXt5KhR3Mp7d.png)

<!-- more -->

## mblock

无意之间发现了 mblock ，在 Scratch 的基础上做了一些二次开发，选择设备模块，然后基于设备定制了一些元素，方便用户更直接的使用设备。

-   编辑器内选择设备 Arduino
-   系统内安装 mlink 驱动程序
-   启动 mlink
-   编辑器内连接
-   ☑️ 显示全部可连接设备
-   选择设备端口 `/dev/tty.usbmodem14101`
-   连接成功
-   积木编程
-   上传到设备

## 原理分析

它是如何工作的？为什么它通过访问网页版本，然后能直接将积木程序转换为可执行代码。
mlink 在这个过程中起到了关键性作用，本地启动的 mlink 是在本地起了一个 websocket 服务。

-   在第四步中连接的时候实际上是建立了一个与 mlink 的服务连接 `ws://127.0.0.1:55278/socket.io/?EIO=3&transport=websocket&sid=-XJBr-WPFDcGSJH6AAAF`
-   在选择设备前，一直在发心跳命令查询设备端口 `getDevices`
-   选择设备端口以后，发送了一个 `open` 命令，这一步编辑器已经与 Arduino 建立了连接
-   上传设备操作实际上是建立了一个 `wss://arduinoserver.makeblock.com/socket.io/?EIO=3&transport=websocket&sid=xDKoLUykR3DtjL5DAG1O` 连接，这一步具体做了什么？
-   代码又是以什么形式上传到设备上去的？

这里还有一些疑问需要继续深入研究一下协议层面的内容

## 末了

大致有了想法，但是对于 mblock 的整个逻辑还是有一些没有理解到，还需要继续深入研究一下才能完善。
