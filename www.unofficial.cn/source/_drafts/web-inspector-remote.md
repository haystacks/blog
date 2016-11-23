---
title: web-inspector-remote
date: 2016-11-22
categories: 
- 学习
tags:
- weinre
---
在入职不久接触了移动端WEB开发，刚开始遇到的问题就是调试的问题。在PC端的时候，我常常纠结在IE与IE之间，主要的兼容问题还是IE一家子和他们的亲戚（啥多核浏览器，也是各种坑不断）之间。IE虽然问题多，但至少它还有一个可视化的调试工具，可以在浏览器中调试调试。面对移动端WEB的兼容问题，各种国产机修改过内核的浏览器，他们又要怎么调试？这一直是个问题，后面接触到了一些方案，其中也包含 `weinre` 。
<!-- more -->
长时间没有使用，即使学会的知识也会遗忘，今天我又因为年中接到的活而把 `weinre` 派上了用场。电脑端也是新装过几次的环境，于是还得重新走这个流程。  

### 发现方法
最近一直活跃在 `segmentfault` ，对于时间的掌控还是不是那么均衡，不能把工作以及业余工作和 `segmentfault` 很好的区分，也就造成了相当大一部分时间的浪费。
下午之前接到的活又来问题了，某个页面的一个块怎么偏离了正常位置，在chrome中模拟是没有任何问题的，没想到的是在实测手机浏览器中会出现问题，如何调试呢？由于忘记了之前学会的方法，最好的方式莫过于搜索一下，搜索结果中发现了 `weinre` 于是想起了 `browser-sync` ，但实际不需要，就只是搜索学习了一下 `weinre`。

[weinre](https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html) 全称是 `Web Inspector Remote`，就是用来调试手机端网页的。在这之前只是使用它调试过本地web静态页面，今天需要调试的是CMS中的模板页面，也就不必在乎是什么浏览器中的网页了，在公司时调试的是上线的页面，在回来的路上在想是不是可以直接调试微信内置浏览器中的兼容问题，试想应该都是可行的。

### 安装Weinre
电脑安装的有 `node` ，于是可以直接使用 `npm` 命令安装即可
```
npm i weinre -g
```

### 怎么使用
拿到一个工具不知所措的时候，都可以直接 `--help` 或者 `-h` 。你想知道的它都能告诉你。
```
weinre --help
```

![](http://ww2.sinaimg.cn/large/e6cd2709gw1fa21j19yedj20fm05naa3.jpg)


- 运行weinre，默认设置什么也不修改，先测试一下本地的正在做的一个Demo
    ```
    weinre
    ```

    ![](http://ww4.sinaimg.cn/large/e6cd2709gw1fa21paidaij20f600vwea.jpg)

    > 默认localhost:8080，浏览器打开 http://localhost:8080 可以参考文档介绍说明

- 编辑正在做的demo

    按照上一步的说明，在文档中添加这一句到Demo中  
    `<script src="http://localhost:8080/target/target-script-min.js#anonymous"></script>` 

- 开启Debug，运行Demo

    打开debug工具页面： http://localhost:8080/client/#anonymous
    打开Demo地址：http://localhost:8088 （这个是用 webpack-dev-server 开的一个开发服务）

    Debug页就可以开启调试模式了
    ![](http://ww4.sinaimg.cn/large/e6cd2709gw1fa24qby2kzg20jn08jwfl.gif)
    
    > PC上使用这个工具没有必要，因为你可以直接用 chrome 的 dev tool 啊。所以还是继续模拟真机

- Mobile真机调试

    手机上要怎么访问PC上的 http://localhost:8088 呢？公网访问一样的道理，通过IP，本机IP是 192.168.95.1，于是重新设置一下webpack-dev-server 的host。相应的 weinre 也绑定host到 192.168.95.1。不能忘记的是修改页面内的包含 script 。  
    `<script src="http://192.168.95.1:8080/target/target-script-min.js#anonymous"></script>`

    打开debug工具页面： http://192.168.95.1:8080/client/#anonymous
    打开Demo地址：http://192.168.95.1:8088 （这个是用 webpack-dev-server 开的一个开发服务）

    ![](http://ww2.sinaimg.cn/mw690/e6cd2709gw1fa2646d36qg208z0fot8i.gif)

    > Mobile与PC在同一网络环境下

- 调试在线网站与微信内置浏览器打开的网页
    
    同真机调试一样的道理，在同一网络环境下，在需要调试的页面内加入 weinre 的 script 监测脚本。借用今天 segmentfault 上的一道关于微信获取地址数据的题目来调试一下是否正常获取数据。参照真机调试中的配置。

    微信内置浏览器访问我的一个测试页面 `http://unofficial.cn/demo.php`

    ![](http://ww1.sinaimg.cn/mw690/e6cd2709gw1fa26fbpxhgg20h40fodj4.gif)

### 准备来使用吧
再也不用担心mobile没有dev tool了，weinre 我值得拥有。下一次应该不会忘记还有这个工具了吧？这一次我自己总结了一下，只为下一次不再重复搜索方法。